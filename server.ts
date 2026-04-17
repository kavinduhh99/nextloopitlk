import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  const user = process.env.EMAIL_USER || "";
  const pass = process.env.EMAIL_PASS || "";
  
  res.json({ 
    status: "ok", 
    env: {
      hasEmailUser: !!user,
      hasEmailPass: !!pass,
      userHasSpaces: user !== user.trim(),
      passHasSpaces: pass !== pass.trim(),
      userHasQuotes: user.startsWith('"') || user.endsWith('"'),
    }
  });
});

// API Route for Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("Attempting to send email via Gmail...");
    const user = process.env.EMAIL_USER?.trim();
    const pass = process.env.EMAIL_PASS?.replace(/\s+/g, ''); // Remove all spaces from password

    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return res.status(500).json({ error: "Server configuration error. Missing credentials." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
      connectionTimeout: 5000, // 5 seconds
      greetingTimeout: 5000,
      socketTimeout: 5000,
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

async function startServer() {
  // Vite middleware for development
  const isDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;
  
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      // Skip API routes so they can be handled by Express
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Always listen on port 3000 in this environment
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Environment: ${isDev ? 'development' : 'production'}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});

export default app;
