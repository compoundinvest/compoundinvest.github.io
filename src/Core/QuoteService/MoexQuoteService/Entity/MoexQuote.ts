import { SimpleQuote } from "../../SimpleQuote";

export class MoexQuote implements SimpleQuote {
    ticker: string;
    quote: number;
    marketCap?: number;

    constructor(ticker: string, quote: number, marketCap?: number) {
        this.ticker = ticker;
        this.quote = quote;
        this.marketCap = marketCap;
    }
}
