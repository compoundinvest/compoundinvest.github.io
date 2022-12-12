import { Pie } from "react-chartjs-2";
import { Portfolio } from "./Entity/Portfolio";
import { Chart } from "chart.js";
import "./PortfolioChartStyles.css";
import autocolors from "chartjs-plugin-autocolors-typescript";
Chart.register(autocolors);

export function PortfolioChart() {
    const chartData = Portfolio.getLocalPortfolio().summaryForPieChart();
    const data = {
        labels: chartData.map((position) => position[0]),
        datasets: [
            {
                label: "Portion of the portfolio (%)",
                data: chartData.map((position) => position[1]),
            },
        ],
    };

    const plugins = [
        {
            id: "autocolors",
            defaults: {
                mode: "data",
            },
        },
    ];

    return (
        <div className="portfolioChart">
            <Pie data={data} plugins={plugins} />;
        </div>
    );
}
