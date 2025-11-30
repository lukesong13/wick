import { config } from "./config.js";

export async function fetchFinnhubQuote(symbol) {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${config.finnhubApiKey}`
    );
    if (!response.ok) throw new Error(`Finnhub error for ${symbol}`);
    return response.json();
  }