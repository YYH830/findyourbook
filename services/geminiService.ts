import { GoogleGenAI } from "@google/genai";
import { BookResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchBooks = async (query: string): Promise<BookResult[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  try {
    // We use the Gemini model with Google Search grounding to find real links.
    // The prompt guides the model to find downloadable content or read-online sources.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find valid, accessible download links, PDF files, or read-online pages for the ebook: "${query}". 
      Prioritize open libraries (Project Gutenberg, Internet Archive, Open Library) and legitimate educational sources. 
      Do not invent links.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounding chunks which contain the actual search results/URLs
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (!groundingChunks || groundingChunks.length === 0) {
      return [];
    }

    // Map the grounding chunks to our BookResult interface
    const results: BookResult[] = groundingChunks
      .map((chunk, index) => {
        if (chunk.web) {
          return {
            id: `web-${index}`,
            title: chunk.web.title || "Unknown Title",
            sourceTitle: new URL(chunk.web.uri).hostname.replace('www.', ''),
            url: chunk.web.uri,
            description: "Source found via Google Search"
          };
        }
        return null;
      })
      .filter((item): item is BookResult => item !== null);

    // Remove duplicates based on URL
    const uniqueResults = Array.from(new Map(results.map(item => [item.url, item])).values());

    return uniqueResults;
  } catch (error: any) {
    console.error("Gemini Search Error:", error);
    throw new Error(error.message || "Failed to search for books.");
  }
};