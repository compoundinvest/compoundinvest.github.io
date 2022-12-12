export class Lot {
    openingDate: Date;
    quantity: number;
    openingPrice: number;
    broker: string;
    currency: string;

    constructor(openingDate: Date, quantity: number, openingPrice: number, broker: string, currency: string) {
        this.openingDate = openingDate;
        this.quantity = quantity;
        this.openingPrice = openingPrice;
        this.broker = broker;
        this.currency = currency;
    }

    isTaxable(): boolean {
        const threeYearsAgo = new Date();
        threeYearsAgo.setMonth(new Date().getMonth() - 36);

        return this.openingDate > threeYearsAgo;
    }
}
