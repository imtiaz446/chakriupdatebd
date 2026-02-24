import express from "express";
import { createServer as createViteServer } from "vite";
import cron from 'node-cron';
import { scrapeJobs, getJobs } from "./src/services/scraperService.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/jobs", (req, res) => {
    try {
      const jobs = getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.post("/api/scrape-now", async (req, res) => {
    try {
      await scrapeJobs();
      res.json({ message: "Scraping started" });
    } catch (error) {
      res.status(500).json({ error: "Scraping failed" });
    }
  });

  // Schedule scraping every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    scrapeJobs();
  });

  // Initial scrape on startup
  scrapeJobs();

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
