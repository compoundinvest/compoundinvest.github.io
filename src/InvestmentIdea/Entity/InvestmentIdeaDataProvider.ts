import { InvestmentIdea } from "./InvestmentIdea";
import { Currency } from "../../Core/Entity/Currency";

import ideas from "./idealist.json";
import { SimpleQuote } from "../../QuoteService/SimpleQuote";

export function getInvestmentIdeasList(quotes: SimpleQuote[]): InvestmentIdea[] {
    let ideaList = getLocalIdeasList();

    for (let i = 0; i < ideaList.length; i++) {
        const quote = quotes.find((quote) => quote.ticker === ideaList[i].ticker);
        if (typeof quote === "undefined") {
            continue;
        }
        ideaList[i].upside = ideaList[i].calculateUpside(quote);
    }

    ideaList.sort((idea1, idea2) => {
        if (idea1.upside == null && idea2.upside == null) return 0;
        if (idea1.upside == null && idea2.upside != null) return 1;
        if (idea1.upside != null && idea2.upside == null) return -1;

        return idea1.upside! > idea2.upside! ? -1 : 1;
    });

    return ideaList;
}

function getLocalIdeasList(): InvestmentIdea[] {
    const properIdeas = ideas;
    var parsedIdeas: InvestmentIdea[] = [];

    const ideasAuthor = ideas.author;

    for (let i = 0; i < properIdeas.values.length; i++) {
        const parsedIdea = new InvestmentIdea(
            ideasAuthor,
            properIdeas.values[i].ticker,
            properIdeas.values[i].currency == "USD" ? Currency.USD : Currency.RUB,
            properIdeas.values[i].targetPrice,
            properIdeas.values[i].risk
        );
        parsedIdeas.push(parsedIdea);
    }

    return parsedIdeas;
}
