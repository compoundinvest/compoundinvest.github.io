/*
Interfaces that mimic Yahoo's response in the their V7 API that returns multiple stocks' quotes.
E.g.: https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,AMZN
*/

export interface YahooQuotes {
    quoteResponse: QuoteResponse;
}

interface QuoteResponse {
    result: StockOverview[];
}

export interface StockOverview {
    symbol: string;
    displayName: string;
    regularMarketPrice: number;
    priceToBook: number;
    forwardPE: number;
    marketCap: number;
    trailingPE: number;
}
