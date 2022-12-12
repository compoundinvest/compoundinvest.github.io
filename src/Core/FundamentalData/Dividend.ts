import { Currency } from "../Entity/Currency";

export namespace Dividend {
    export function annualDPS(ticker: string): DPS {
        return getLocalDPS(ticker);
    }

    enum DividendPeriod {
        quarterly,
        annual,
    }

    interface DPS {
        period: DividendPeriod;
        dividend: number;
        currency: Currency;
    }

    const dpsDictionary: Record<string, DPS> = {
        MTSS: { period: DividendPeriod.annual, dividend: 30, currency: Currency.RUB },
        AFKS: { period: DividendPeriod.annual, dividend: 1.19, currency: Currency.RUB },
    };

    function getLocalDPS(ticker: string): DPS {
        return dpsDictionary[ticker];
    }
}
