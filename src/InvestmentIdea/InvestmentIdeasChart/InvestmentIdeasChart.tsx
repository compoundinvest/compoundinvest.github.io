import React from "react";
import "./InvestmentIdeasChart.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { ScriptElementKindModifier } from "typescript";
import { fetchMOEXQuotes } from "../../QuoteService/MoexQuoteService/MoexQuoteDataProvider";
import { useState } from "react";
import { useEffect } from "react";
import { InvestmentIdea } from "../Entity/InvestmentIdea";
import { getInvestmentIdeasList } from "../Entity/InvestmentIdeaDataProvider";

export function InvestmentIdeasPage() {
    return (
        <div>
            <Navigation />
            <RevenueChart />
        </div>
    );
}

function Navigation() {
    return (
        <nav className="nav">
            <ul className="navigation-items">
                <li>Pricing1</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
}

function RevenueChart() {
    const [ideasList, updateUpsides] = useState<InvestmentIdea[]>([]);

    useEffect(() => {
        const fetchQuotes = async () => {
            const quotes = await fetchMOEXQuotes();
            const ideas = getInvestmentIdeasList(quotes);
            updateUpsides(ideas);
        };
        fetchQuotes();
    }, []);

    const barLabels = ideasList.map((idea) => idea.ticker);
    const chartValues = ideasList.map((idea) => idea.upside);

    const data = {
        labels: barLabels,
        datasets: [
            {
                label: "Апсайд (%)",
                data: chartValues,
                backgroundColor: [
                    "rgba(173,255,47, 0.5)",
                    // "rgba(173,255,47, 0.5)",
                    // "rgba(173,255,47, 0.5)",
                    // "rgba(173,255,47, 0.5)",
                    // "rgba(173,255,47, 0.5)",
                    // "rgba(173,255,47, 0.5)",
                    // "rgba(255, 99, 132, 0.2)",
                ],
                borderWidth: 1,
            },
        ],
    };
    console.log(data);
    return (
        <div
            style={{
                height: "50vh",
                position: "relative",
                marginBottom: "1%",
                padding: "1%",
            }}
        >
            <Bar data={data} options={{ maintainAspectRatio: false }}></Bar>
        </div>
    );
}
