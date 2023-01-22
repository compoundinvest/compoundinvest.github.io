import { cu } from "chart.js/dist/chunks/helpers.core";
import { Currency } from "../../../Core/Entity/Currency";
import { SimpleQuote } from "../../../Core/QuoteService/SimpleQuote";

export interface InvestmentIdeasDTO {
    author: string;
    ideas: InvestmentIdeaDTO[];
}

export interface InvestmentIdeaDTO {
    ticker: string;
    companyName: string;
    currency: string;
    targetPrice: number;
    priceOnOpening: number;
    upside: number;
    openingDate: Date;
    thesis: string;
    currentQuote?: number;
}

export class InvestmentIdea {
    author: string;
    ticker: string;
    companyName: string;
    currency: Currency;
    targetPrice: number;
    priceOnOpening: number;
    upside: number;
    openingDate: Date;
    thesis: string;
    currentQuote?: number;

    constructor(
        author: string,
        ticker: string,
        companyName: string,
        currency: Currency,
        targetPrice: number,
        priceOnOpening: number,
        upside: number,
        openingDate: Date,
        thesis: string,
        currentQuote?: number
    ) {
        this.author = author;
        this.ticker = ticker;
        this.currency = currency;
        this.targetPrice = targetPrice;
        this.upside = upside;
        this.thesis = thesis;
        this.priceOnOpening = priceOnOpening;
        this.openingDate = openingDate;
        this.currentQuote = currentQuote;
        this.companyName = companyName;
    }

    static initFrom(dto: InvestmentIdeaDTO, author: string): InvestmentIdea {
        return new InvestmentIdea(
            author,
            dto.ticker,
            dto.companyName,
            dto.currency === "USD" ? Currency.USD : Currency.RUB,
            dto.targetPrice,
            dto.priceOnOpening,
            dto.upside,
            new Date(dto.openingDate),
            dto.thesis,
            dto.currentQuote
        );
    }

    calculateUpside(currentQuote: SimpleQuote): number | undefined {
        if (currentQuote.quote <= 0) {
            return undefined;
        }

        const upside = (this.targetPrice - currentQuote.quote) / currentQuote.quote;

        const upsideAsPercentage = upside * 100;
        return upsideAsPercentage;
    }

    calculateCurrentReturn(): number | undefined {
        if (this.currentQuote === undefined || this.currentQuote! <= 0) {
            return undefined;
        }

        if (this.priceOnOpening === undefined || this.priceOnOpening <= 0) {
            return undefined;
        }

        return (this.currentQuote! / this.priceOnOpening) * 100 - 100;
    }

    calculateAnnualizedReturn(): number | undefined {
        const currentReturn = this.calculateCurrentReturn();
        if (currentReturn === undefined) {
            return undefined;
        }

        const durationInDays = (new Date().valueOf() - this.openingDate.valueOf()) / (1000 * 60 * 60 * 24);
        const dailyReturn = currentReturn / durationInDays;
        const annualizedReturn = dailyReturn * 365;

        return annualizedReturn;
    }
}
