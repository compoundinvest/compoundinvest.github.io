import React from "react";
import "./InvestmentIdeasChart.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import { InvestmentIdea } from "../Entity/InvestmentIdea";
import { fetchInvestmentIdeasList } from "../Entity/InvestmentIdeaDataProvider";
import { getOrCreateTooltip } from "./CustomTooltip/utilFunctions";
import {
    makeTargetRow,
    makePriceOnOpeningRow,
    makeCurrentReturnRow,
    makeUpsideRow,
    makeThesisRow,
} from "./CustomTooltip/tooltipGenerator";

import { TooltipPositionerMap } from "chart.js";

Chart.register(...registerables);

export function InvestmentIdeasPage() {
    return <RevenueChart />;
}

function RevenueChart() {
    const [investmentIdeas, updateIdeas] = useState<InvestmentIdea[]>([]);
    useEffect(() => {
        const fetchIdeas = async () => {
            const ideasList = await fetchInvestmentIdeasList();
            updateIdeas(ideasList);
        };
        fetchIdeas();
    }, []);

    const barLabels = investmentIdeas.map((idea) => idea.ticker);
    const chartValues = investmentIdeas.map((idea) => idea.upside);

    const data = {
        labels: barLabels,
        datasets: [
            {
                label: "Апсайд (%)",
                data: chartValues,
                backgroundColor: ["rgba(34,139,34, 0.7)"],
            },
        ],
    };

    const externalTooltipHandler = (context: { chart: any; tooltip: any }) => {
        // Tooltip Element
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart, tooltip);

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set Text
        if (tooltip.body) {
            const currentIdea = investmentIdeas[context.tooltip.dataPoints[0].dataIndex];
            // const bodyLines = tooltip.body.map((b: { lines: any }) => b.lines);

            const tableHead = document.createElement("thead");

            const tr = document.createElement("tr");
            tr.style.borderWidth = String(0);

            const th = document.createElement("th");
            th.style.borderWidth = String(0);
            const headerText = currentIdea.companyName === undefined ? currentIdea.ticker : currentIdea.companyName;
            const text = document.createTextNode(headerText);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);

            const tableBody = document.createElement("tbody");
            //Adding the upside row
            // bodyLines.forEach((body: string, i: string | number) => {
            //     const tr = document.createElement("tr");
            //     tr.style.backgroundColor = "inherit";
            //     tr.style.borderWidth = String(0);

            //     const td = document.createElement("td");
            //     td.style.borderWidth = String(0);

            //     const text = document.createTextNode(body);

            //     td.appendChild(makeLittleLegendSquare(tooltip));
            //     td.appendChild(text);
            //     tr.appendChild(td);
            //     tableBody.appendChild(tr);
            // });

            //Adding the upside row
            const upsideRow = makeUpsideRow(currentIdea, tooltip);
            tableBody.appendChild(upsideRow);

            //Adding the target row
            const targetRow = makeTargetRow(currentIdea);
            tableBody.appendChild(targetRow);

            //Adding the target row
            const priceOnOpeningRow = makePriceOnOpeningRow(currentIdea);
            tableBody.appendChild(priceOnOpeningRow);

            //Adding the return row
            const currentReturnRow = makeCurrentReturnRow(currentIdea);
            tableBody.appendChild(currentReturnRow);

            //Adding the thesis row
            const thesisRow = makeThesisRow(currentIdea);
            tableBody.appendChild(thesisRow);

            const tableRoot = tooltipEl.querySelector("table");

            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + "px";
        tooltipEl.style.top = positionY + tooltip.caretY + "px";
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";

        tooltipEl.style.position = "absolute";
        tooltipEl.style.pointerEvents = "none";
    };

    const options: any = {
        plugins: {
            tooltip: {
                enabled: false,
                position: "nearest",
                external: externalTooltipHandler,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div
            style={{
                height: "50vh",
                position: "relative",
                marginBottom: "1%",
                padding: "1%",
            }}
        >
            <Bar data={data} options={options}></Bar>
        </div>
    );
}

// callbacks: {
//     title: (xDatapoint: any) => {
//         const idea = investmentIdeas[xDatapoint[0].parsed.x];
//         return idea.companyName ?? idea.ticker;
//     },
//     label: (yDatapoint: any) => {
//         return "Апсайд: " + yDatapoint.parsed.y.toFixed(0) + "%";
//     },
//     afterLabel: (tooltipItems: any) => {
//         let footerText = "";
//         const idea = investmentIdeas[tooltipItems.dataIndex];

//         footerText += "Дата открытия: " + idea.openingDate + "\n";
//         footerText += "Таргет: " + idea.currency + idea.targetPrice + "\n";
//         footerText += "Текущая доходность: ";
//         // if (idea.thesis !== undefined) {
//         //     footerText += "\nИдея: " + idea.thesis;
//         // }

//         return footerText;
//     },
// footer: (tooltipItems: any) => {
//     let footerText = "";
//     const idea = investmentIdeas[tooltipItems[0].dataIndex];

//     footerText += "Дата открытия: " + idea.openingDate + "\n";
//     footerText += "Таргет: " + idea.currency + idea.targetPrice + "\n";
//     footerText += "Текущая доходность: ";
//     if (idea.thesis !== undefined) {
//         footerText += "\nИдея: " + idea.thesis;
//     }

//     return footerText;
// },
// },
// footerFont: {
//     weight: "normal",
// },
