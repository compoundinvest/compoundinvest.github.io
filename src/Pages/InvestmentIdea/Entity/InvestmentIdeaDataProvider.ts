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
    return parsedIdeas.sort(sortInvestmentIdeas);
}

export function sortInvestmentIdeas(idea1: InvestmentIdea, idea2: InvestmentIdea): number {
    if (idea1.upside == null && idea2.upside == null) return 0;
    if (idea1.upside == null && idea2.upside != null) return 1;
    if (idea1.upside != null && idea2.upside == null) return -1;

    return idea1.upside! > idea2.upside! ? -1 : 1;
}
