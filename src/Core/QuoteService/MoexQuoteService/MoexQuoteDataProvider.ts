import { MoexQuote } from "./Entity/MoexQuote";
import { MOEXResponse } from "./Entity/MoexQuoteDTO";
import axios from "axios";

export async function fetchMOEXQuotes(): Promise<MoexQuote[]> {
    const response = await axios.get<MOEXResponse>(
        "https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=on&iss.only=marketdata&marketdata.columns=SECID,LAST,ISSUECAPITALIZATION"
    );

    let quotes: MoexQuote[] = [];
    const uncastQuotes = response.data.marketdata.data;
    if (uncastQuotes.length === 0) {
        return [];
    }

    uncastQuotes.forEach((uncastQuote) => {
        if (typeof uncastQuote[0] !== "string") {
            return;
        }
        if (typeof uncastQuote[1] !== "number") {
            return;
        }

        const quote = new MoexQuote(uncastQuote[0] as string, uncastQuote[1] as number, uncastQuote[2] as number);
        quotes.push(quote);
    });
    return quotes;
}
