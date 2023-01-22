import { InvestmentIdea } from "../../Entity/InvestmentIdea";
import { makeTableRow, makeUpsideRowFromText } from "./utilFunctions";

export function makeUpsideRow(idea: InvestmentIdea, tooltip: any): HTMLTableRowElement {
    let upsideRowText = "Апсайд: ";
    if (idea.upside === undefined) {
        upsideRowText += "N/A";
    } else {
        upsideRowText += idea.upside.toFixed(0) + "%";
    }
    return makeUpsideRowFromText(upsideRowText, tooltip);
}

export function makeTargetRow(idea: InvestmentIdea): HTMLTableRowElement {
    const targetRowText = "Таргет: " + idea.currency + idea.targetPrice;
    return makeTableRow(targetRowText);
}

export function makePriceOnOpeningRow(idea: InvestmentIdea): HTMLTableRowElement {
    let priceOnOpeningRowText = "Цена при открытии: ";
    if (idea.priceOnOpening === undefined) {
        priceOnOpeningRowText += "N/A";
    } else {
        priceOnOpeningRowText += idea.currency + idea.priceOnOpening.toFixed(2);

        priceOnOpeningRowText += " (" + beautifulIdeaOpeningDate(idea) + ")";
    }
    return makeTableRow(priceOnOpeningRowText);
}

export function makeCurrentReturnRow(idea: InvestmentIdea): HTMLTableRowElement {
    const currentReturn = idea.calculateCurrentReturn();
    let currentReturnText = "Тек. доходность: ";

    if (currentReturn === undefined) {
        currentReturnText += "N/A";
    } else {
        currentReturnText += String(currentReturn.toFixed(0)) + "%";
        const annualizedReturn = idea.calculateAnnualizedReturn();
        if (annualizedReturn !== undefined) {
            currentReturnText += " (" + annualizedReturn.toFixed(0) + "% годовых)";
        }
    }

    return makeTableRow(currentReturnText);
}

export function makeThesisRow(idea: InvestmentIdea): HTMLTableRowElement {
    const thesis = "Идея: " + idea.thesis;
    return makeTableRow(thesis);
}

//MARK: - Ancillary functions
function beautifulIdeaOpeningDate(idea: InvestmentIdea): string {
    let openingDateString = "";

    openingDateString += String(idea.openingDate.getUTCDate());
    openingDateString += " " + convertMonthNumberToString(idea.openingDate.getUTCMonth());
    openingDateString += " " + String(idea.openingDate.getUTCFullYear());

    return openingDateString;
}

function convertMonthNumberToString(number: number): string {
    switch (number) {
        case 0: {
            return "янв,";
        }
        case 1: {
            return "фев,";
        }
        case 2: {
            return "мар,";
        }
        case 3: {
            return "апр,";
        }
        case 4: {
            return "мая,";
        }
        case 5: {
            return "июня,";
        }
        case 6: {
            return "июля,";
        }
        case 7: {
            return "авг,";
        }
        case 8: {
            return "сен,";
        }
        case 9: {
            return "окт,";
        }
        case 10: {
            return "ноя,";
        }
        case 11: {
            return "дек,";
        }
        default: {
            return String(number);
        }
    }
}

// export function

// const tr2 = document.createElement("tr");
// tr2.style.backgroundColor = "inherit";
// tr2.style.borderWidth = String(0);

// const ideastd = document.createElement("td");
// ideastd.style.borderWidth = String(0);
// // const someOtherText = new Text("\n" + String(context.tooltip.dataPoints[0].dataIndex));
// const someOtherText = document.createTextNode("Hello, world!\nReturn:\nThesis:\n");
// // ideastd.appendChild(span);
// ideastd.appendChild(someOtherText);

// tr2.appendChild(ideastd);

// const tr3 = document.createElement("tr");
// tr3.style.backgroundColor = "inherit";
// tr3.style.borderWidth = String(0);

// const newtd = document.createElement("td");
// newtd.style.borderWidth = String(0);
// // const someOtherText = new Text("\n" + String());
// const newText = document.createTextNode("Hello, world!\nReturn:\nThesis:\n");
// // newtd.appendChild(span);
// newtd.appendChild(newText);

// tr3.appendChild(newtd);
