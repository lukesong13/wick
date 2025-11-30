import { config } from "./config.js";

export async function fetchFinnhubQuote(symbol) {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${config.finnhubApiKey}`
    );
    if (!response.ok) throw new Error(`Finnhub error for ${symbol}`);
    return response.json();
  }

export async function fetchAlphaVantageDaily(symbol) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${config.alphaVantageApiKey}`
    );
    if (!response.ok) throw new Error("Alpha Vantage error");
    return response.json(); 
}  