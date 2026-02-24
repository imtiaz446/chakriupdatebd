import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenAI, Type } from "@google/genai";
import Database from 'better-sqlite3';

const db = new Database('jobs.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT,
    organization TEXT,
    deadline TEXT,
    education TEXT,
    category TEXT,
    postedDate TEXT,
    details TEXT,
    applyLink TEXT,
    sourceUrl TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function scrapeJobs() {
  console.log('Starting job scraping...');
  
  // Example target: A mock or real job portal listing page
  // In a real scenario, you'd add multiple URLs here
  const targetUrls = [
    'https://todayinbd.com/category/govt-jobs/', // Example govt job blog
  ];

  for (const url of targetUrls) {
    try {
      const { data: html } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const $ = cheerio.load(html);
      
      // This selector depends on the target website's structure
      // For this example, we'll look for common article/post links
      const links: string[] = [];
      $('article h2 a, .post-title a').each((_, el) => {
        const link = $(el).attr('href');
        if (link) links.push(link);
      });

      console.log(`Found ${links.length} potential job links on ${url}`);

      for (const link of links.slice(0, 5)) { // Limit to 5 for demo
        // Check if already exists
        const exists = db.prepare('SELECT id FROM jobs WHERE sourceUrl = ?').get(link);
        if (exists) {
          console.log(`Skipping existing job: ${link}`);
          continue;
        }

        await processJobLink(link);
      }
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }
}

async function processJobLink(link: string) {
  try {
    console.log(`Processing job: ${link}`);
    const { data: html } = await axios.get(link);
    const $ = cheerio.load(html);
    
    // Extract raw text for Gemini to process
    const rawText = $('article, .entry-content').text().trim();
    
    if (!rawText) return;

    // Use Gemini to extract structured data and rewrite content
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Extract job details from the following text and return as JSON. 
        Also, rewrite the 'details' section in professional Bengali to avoid copyright issues and optimize for SEO.
        The title should be SEO friendly and include the current date (${new Date().toLocaleDateString('bn-BD')}).

        Text:
        ${rawText}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            organization: { type: Type.STRING },
            deadline: { type: Type.STRING },
            education: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['government', 'bank', 'private'] },
            details: { type: Type.STRING },
            applyLink: { type: Type.STRING }
          },
          required: ['title', 'organization', 'deadline', 'category', 'details']
        }
      }
    });

    const jobData = JSON.parse(response.text || '{}');
    
    // Insert into database
    const id = Math.random().toString(36).substring(7);
    db.prepare(`
      INSERT INTO jobs (id, title, organization, deadline, education, category, postedDate, details, applyLink, sourceUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      jobData.title,
      jobData.organization,
      jobData.deadline,
      jobData.education || 'N/A',
      jobData.category,
      new Date().toLocaleDateString('bn-BD'),
      jobData.details,
      jobData.applyLink || link,
      link
    );

    console.log(`Successfully added job: ${jobData.title}`);
    
    // Optional: Auto share to social media
    await shareToSocialMedia(jobData);
  } catch (error) {
    console.error(`Error processing link ${link}:`, error);
  }
}

async function shareToSocialMedia(job: any) {
  // Telegram Example
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const message = `📢 *${job.title}*\n🏢 প্রতিষ্ঠান: ${job.organization}\n⏳ ডেডলাইন: ${job.deadline}\n\nবিস্তারিত: ${process.env.APP_URL}`;
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
      console.log('Shared to Telegram');
    } catch (e) {
      console.error('Telegram share failed', e);
    }
  }

  // Facebook sharing would typically use the Graph API or a service like Buffer/Zapier
}

export function getJobs() {
  return db.prepare('SELECT * FROM jobs ORDER BY createdAt DESC').all();
}
