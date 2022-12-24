import axios from "axios";
import { YahooQuote } from "./Entity/YahooQuote";
import { YahooQuotesDTO, StockOverviewDTO } from "./Entity/YahooQuotes";

export async function fetchYahooQuotesForIdeas(): Promise<YahooQuote[]> {
    const tickerList: string[] = [];
    const quotes = await fetchYahooQuotes(tickerList);
    return quotes;
}

async function fetchYahooQuotes(tickers: string[]): Promise<YahooQuote[]> {
    const yahooAPIStockURL: string = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + tickers.join(",");
    const response = await axios.get<YahooQuotesDTO>(yahooAPIStockURL);

    const uncastQuotes: StockOverviewDTO[] = response.data.quoteResponse.result;
    if (uncastQuotes.length === 0) {
        return [];
    }

    var quotes: YahooQuote[] = [];
    uncastQuotes.forEach((uncastQuote) => {
        if (typeof uncastQuote.symbol !== "string") {
            return;
        }
        if (typeof uncastQuote.regularMarketPrice !== "number") {
            return;
        }

        const quote = new YahooQuote(uncastQuote);
        quotes.push(quote);
    });
    console.log(quotes);
    return quotes;
}
