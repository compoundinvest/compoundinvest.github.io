import { SimpleQuote } from "../../SimpleQuote";
import { StockOverviewDTO } from "./YahooQuotes";

/*
Singular Yahoo quote provided by Yahoo's V10 API
E.g.: https://query1.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=price
*/

/*
interface YahooQuoteDTO {
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
*/

export class YahooQuote implements SimpleQuote {
    ticker: string;
    quote: number;

    constructor(quoteDTO: StockOverviewDTO) {
        this.ticker = quoteDTO.symbol;
        this.quote = quoteDTO.regularMarketPrice;
    }
}
