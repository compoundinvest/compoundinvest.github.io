import { Position } from "./Position";
import portfolio from "./portfolio.json";
import { Lot } from "./Lot";

export class Portfolio {
    owner: string;
    positions: Position[];

    constructor(owner: string, positions: Position[]) {
        this.owner = owner;
        this.positions = positions;
    }

    static getLocalPortfolio(): Portfolio {
        let positions: Position[] = [];

        portfolio.positions.forEach((position) => {
            let lots: Lot[] = [];

            position.lots.forEach((lot) => {
                lots.push(new Lot(new Date(lot.openingDate), lot.quantity, lot.openingPrice, lot.broker, lot.currency));
            });

            positions.push(new Position(position.ticker, lots));
        });

        return new Portfolio(portfolio.owner, positions);
    }

    summaryForPieChart(): [string, number][] {
        return this.positions
            .sort((position1, position2) => {
                return position1.cost() < position2.cost() ? -1 : 1;
            })
            .map((position) => [position.ticker, position.cost()]);
    }

    pieChartColors(): string[] {
        return generateColors(5);
    }
}

function generateColors(count: number): string[] {
    const colors: string[] = [
        //"rgba(173,255,47, 0.5)
        "rgba(198,227,222, 1)",
        "rgba(186,220,168, 1)",
        "rgba(247,240,163, 1)",
        "rgba(249,194,163, 1)",
        "rgba(249,163,174, 1)",
    ];

    return colors;
}
