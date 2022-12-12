import { Dividend } from "../../../Core/FundamentalData/Dividend";
import { Lot } from "./Lot";

export class Position {
    ticker: string;
    lots: Lot[];

    constructor(ticker: string, lots: Lot[]) {
        this.ticker = ticker;
        this.lots = lots;
    }

    quantity(): number {
        return this.lots.map((lot) => lot.quantity).reduce((acc, value) => acc + value, 0);
    }

    cost(): number {
        return this.lots.map((lot) => lot.quantity * lot.openingPrice).reduce((acc, value) => acc + value, 0);
    }

    averageOpeningPrice(): number {
        return this.quantity() * this.cost();
    }

    dividendFlow(): number {
        return this.quantity() * Dividend.annualDPS(this.ticker).dividend;
    }
}
