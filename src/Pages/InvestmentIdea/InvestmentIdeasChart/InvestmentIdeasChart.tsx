import React from "react";
import "./InvestmentIdeasChart.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { fetchMOEXQuotes } from "../../../Core/QuoteService/MoexQuoteService/MoexQuoteDataProvider";
import { fetchYahooQuotesForIdeas } from "../../../Core/QuoteService/YahooQuoteService/YahooQuoteDataProvider";
import { useState } from "react";
import { useEffect } from "react";
import { InvestmentIdea } from "../Entity/InvestmentIdea";
import { getInvestmentIdeasList, sortInvestmentIdeas } from "../Entity/InvestmentIdeaDataProvider";

Chart.register(...registerables);

export function InvestmentIdeasPage() {
    return <RevenueChart />;
}

function RevenueChart() {
    const [russianIdeasList, updateRussianUpsides] = useState<InvestmentIdea[]>([]);
    useEffect(() => {
        const fetchMoexQuotes = async () => {
            const quotes = await fetchMOEXQuotes();
            const russianIdeas = getInvestmentIdeasList(quotes).filter((idea) => idea.currency === "RUB");
            updateRussianUpsides(russianIdeas);
        };

        fetchMoexQuotes();
    }, []);

    const [foreignIdeasList, updateForeignUpsides] = useState<InvestmentIdea[]>([]);
    useEffect(() => {
        const fetchYahooQuotesHandler = async () => {
            const yahooQuotes = await fetchYahooQuotesForIdeas();
            const nonRussianIdeas = getInvestmentIdeasList(yahooQuotes).filter((idea) => idea.currency === "USD");
            updateForeignUpsides(nonRussianIdeas);
        };
        fetchYahooQuotesHandler();
    }, []);

    const barLabels = [...russianIdeasList, ...foreignIdeasList].sort(sortInvestmentIdeas).map((idea) => idea.ticker);
    const chartValues = [...russianIdeasList, ...foreignIdeasList].sort(sortInvestmentIdeas).map((idea) => idea.upside);

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
