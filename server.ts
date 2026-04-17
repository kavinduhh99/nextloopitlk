import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import * as BREVO_MODULE from "@getbrevo/brevo";
import dotenv from "dotenv";

const BREVO: any = (BREVO_MODULE as any).default || BREVO_MODULE;

dotenv.config();

// Function to get Brevo API instance
let apiInstance: any = null;
function getBrevoApi() {
  if (!apiInstance) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error("BREVO_API_KEY is missing");
    }
    apiInstance = new BREVO.TransactionalEmailsApi();
    apiInstance.setApiKey(BREVO.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  }
  return apiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      console.log("Attempting to send email via Brevo...");
      const apiInstance = getBrevoApi();
      
      const sendSmtpEmail = new BREVO.SendSmtpEmail();
      
      sendSmtpEmail.subject = `New Contact Form Submission from ${name}`;
      sendSmtpEmail.htmlContent = `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
      `;
      sendSmtpEmail.sender = { 
        name: "NextLoop IT Contact Form", 
        email: process.env.BREVO_SENDER_EMAIL || "hello@nextloopit.com" 
      };
      sendSmtpEmail.to = [{ email: "nextloopit@gmail.com" }];
      sendSmtpEmail.replyTo = { email: email, name: name };

      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("Email sent successfully via Brevo:", data.body);
      res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Brevo Email error:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
