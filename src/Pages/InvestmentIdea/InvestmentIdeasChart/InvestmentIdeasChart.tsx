import React from "react";
import "./InvestmentIdeasChart.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import { InvestmentIdea } from "../Entity/InvestmentIdea";
import { fetchInvestmentIdeasList } from "../Entity/InvestmentIdeaDataProvider";

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

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: (xDatapoint: any) => {
                        const idea = investmentIdeas[xDatapoint[0].parsed.x];
                        return idea.companyName ?? idea.ticker;
                    },
                    label: (yDatapoint: any) => {
                        return "Апсайд: " + yDatapoint.parsed.y.toFixed(0) + "%";
                    },
                    footer: (tooltipItems: any) => {
                        let footerText = "";
                        const idea = investmentIdeas[tooltipItems[0].dataIndex];

                        footerText += "Дата открытия: " + idea.openingDate + "\n";
                        footerText += "Таргет: " + idea.currency + idea.targetPrice + "\n";
                        footerText += "Текущая доходность: ";
                        if (idea.thesis !== undefined) {
                            footerText += "\nИдея: " + idea.thesis;
                        }

                        return footerText;
                    },
                },
                footerFont: {
                    weight: "normal",
                },
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
