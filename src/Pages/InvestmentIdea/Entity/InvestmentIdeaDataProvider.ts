import { InvestmentIdea, InvestmentIdeasDTO } from "./InvestmentIdea";
import axios from "axios";

const APIGatewayURL = "https://d5d8uugk950o7qa1ofv0.apigw.yandexcloud.net";

export async function fetchInvestmentIdeasList(): Promise<InvestmentIdea[]> {
    const ideasEndpointURL = "/investmentideas";
    const ideasResponse = await axios.get<InvestmentIdeasDTO>(APIGatewayURL + ideasEndpointURL);

    let parsedIdeas: InvestmentIdea[] = [];
    const author = ideasResponse.data.author;
    for (let i = 0; i < ideasResponse.data.ideas.length; i++) {
        const parsedIdea = InvestmentIdea.initFrom(ideasResponse.data.ideas[i], author);
        parsedIdeas.push(parsedIdea);
    }
    return parsedIdeas;
}

// export function getInvestmentIdeasList(quotes: SimpleQuote[]): InvestmentIdea[] {
//     let ideaList = getLocalIdeasList();

//     for (let i = 0; i < ideaList.length; i++) {
//         const quote = quotes.find((quote) => quote.ticker === ideaList[i].ticker);
//         if (typeof quote === "undefined") {
//             continue;
//         }
//         ideaList[i].upside = ideaList[i].calculateUpside(quote);
//     }

//     ideaList.sort(sortInvestmentIdeas);

//     return ideaList;
// }

export function sortInvestmentIdeas(idea1: InvestmentIdea, idea2: InvestmentIdea): number {
    if (idea1.upside == null && idea2.upside == null) return 0;
    if (idea1.upside == null && idea2.upside != null) return 1;
    if (idea1.upside != null && idea2.upside == null) return -1;

    return idea1.upside! > idea2.upside! ? -1 : 1;
}

// function getLocalIdeasList(): InvestmentIdea[] {
//     const properIdeas = ideas;
//     var parsedIdeas: InvestmentIdea[] = [];

//     const ideasAuthor = ideas.author;

//     for (let i = 0; i < properIdeas.values.length; i++) {
//         const parsedIdea = new InvestmentIdea(
//             ideasAuthor,
//             properIdeas.values[i].ticker,
//             properIdeas.values[i].currency === "USD" ? Currency.USD : Currency.RUB,
//             properIdeas.values[i].targetPrice,
//             properIdeas.values[i].risk
//         );
//         parsedIdeas.push(parsedIdea);
//     }

//     return parsedIdeas;
// }

// export function tickersForYahooQuoteService(): string[] {
//     const allIdeas = getLocalIdeasList();
//     return allIdeas.filter((idea) => idea.currency === "USD").map((idea) => idea.ticker);
// }
