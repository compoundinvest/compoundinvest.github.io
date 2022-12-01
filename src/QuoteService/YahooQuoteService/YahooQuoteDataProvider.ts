import axios from "axios";
import { YahooQuotes, StockOverview } from "./Entity/YahooQuotes";

export async function fetchYahooQuotes(tickers: string[]): Promise<StockOverview[]> {
    const yahooAPIStockURL: string = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + tickers.join(",");
    var quotes: StockOverview[] = [];

    const fetchedQuotes = await axios.get<YahooQuotes>(yahooAPIStockURL).then(function (response) {
        quotes = response.data.quoteResponse.result;
    });

    return quotes;
}
