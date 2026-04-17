import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
      console.log("Attempting to send email via Gmail...");
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
        return res.status(500).json({ error: "Server configuration error. Missing credentials." });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.verify();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "nextloopit@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Service: ${service}
          Message: ${message}
        `,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Gmail Email error:", error);
      const errorMessage = error instanceof Error ? error.message : "Details unknown";
      res.status(500).json({ error: `Failed to send message: ${errorMessage}` });
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
