import { Currency } from "../../../Core/Entity/Currency";
import { SimpleQuote } from "../../../Core/QuoteService/SimpleQuote";

export interface InvestmentIdeasDTO {
    author: string;
    ideas: InvestmentIdeaDTO[];
}

export interface InvestmentIdeaDTO {
    ticker: string;
    targetPrice: number;
    currency: string;
    upside: number;
}

export class InvestmentIdea {
    author: string;
    ticker: string;
    companyName?: string;
    currency: Currency;
    targetPrice: number;
    priceOnOpening?: number;
    openingDate?: Date;
    risk?: string;
    investmentThesis?: string;
    upside: number;

    constructor(
        author: string,
        ticker: string,
        currency: Currency,
        targetPrice: number,
        // risk: string,
        // priceOnOpening?: number,
        // openingDate?: Date,
        // investmentThesis?: string,
        // companyName?: string,
        upside: number
    ) {
        this.author = author;
        this.ticker = ticker;
        this.currency = currency;
        this.targetPrice = targetPrice;
        this.upside = upside;
        // this.priceOnOpening = priceOnOpening;
        // this.openingDate = openingDate;
        // this.risk = risk;
        // this.companyName = companyName;
        // this.investmentThesis = investmentThesis;
    }

    calculateUpside(currentQuote: SimpleQuote): number | undefined {
        if (currentQuote.quote <= 0) {
            return undefined;
        }

        const upside = (this.targetPrice - currentQuote.quote) / currentQuote.quote;

        const upsideAsPercentage = upside * 100;
        return upsideAsPercentage;
    }

    static initFrom(dto: InvestmentIdeaDTO, author: string): InvestmentIdea {
        return new InvestmentIdea(
            author,
            dto.ticker,
            dto.currency === "USD" ? Currency.USD : Currency.RUB,
            dto.targetPrice,
            dto.upside
        );
    }
}
