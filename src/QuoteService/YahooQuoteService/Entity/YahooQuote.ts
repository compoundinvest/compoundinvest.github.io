/*
Singular Yahoo quote provided by Yahoo's V10 API
E.g.: https://query1.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=price
*/
export interface YahooQuote {
    quoteSummary: QuoteSummary;
}

interface QuoteSummary {
    result: Result[];
}

interface Result {
    price: Price;
}

interface Price {
    regularMarketPrice: PostMarketChange;
}

interface PostMarketChange {
    raw: number;
    fmt: string;
}
