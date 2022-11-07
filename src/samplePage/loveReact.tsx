import React from 'react';
import reactLogo from "./resources/images/react-logo.png"
import './loveReact.css'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import axios from 'axios';
import { ScriptElementKindModifier } from 'typescript';

//Main Component
export function ReasonsILoveReactPage() {

    return (
        <div>
            <Navigation />
            <MainSection />
            <RevenueChart />
            <Footer />
        </div>
    )
}

function RevenueChart() {
    const labels = ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"]
const data = {
  labels: labels,
  datasets: [{
    label: 'Выручка (млрд)',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(173,255,47, 0.5)',
      'rgba(173,255,47, 0.5)',
      'rgba(173,255,47, 0.5)',
      'rgba(173,255,47, 0.5)',
      'rgba(173,255,47, 0.5)',
      'rgba(173,255,47, 0.5)',
      'rgba(255, 99, 132, 0.2)',
    ],
    borderWidth: 1
  }]
};
    console.log(data)
    return (
        <div style={{height:"50vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
            <Bar data={data} options={{ maintainAspectRatio: false }}></Bar>
        </div>
    )
}

function ReactLogo() {
    return (
        <header>
            <nav>
                <img src = {reactLogo} className="react-logo" alt="React Logo"/>
            </nav>
        </header>
    )
}

interface MOEXResponse {
    marketdata: Marketdata;
}

interface Marketdata {
    metadata: Metadata;
    columns:  string[];
    data:     Array<Quote>;
}

interface Metadata {
    SECID:               Secid;
    LAST:                Issuecapitalization;
    ISSUECAPITALIZATION: Issuecapitalization;
}

interface Issuecapitalization {
    type: string;
}

interface Secid {
    type:     string;
    bytes:    number;
    max_size: number;
}

class Quote {
    Ticker: String
    Quote: number
    MarketCap?: number

    constructor(ticker: string, quote: number, marketCap?: number) {
        this.Ticker = ticker
        this.Quote = quote
        this.MarketCap = marketCap
    }
}

function Navigation() {

    var quotes: Quote[] = []

    axios.get<MOEXResponse>("https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=on&iss.only=marketdata&marketdata.columns=SECID,LAST,ISSUECAPITALIZATION")
        .then(function (response) {
            console.log("Response!!:")
            quotes = response.data.marketdata.data as Quote[]
            for (let i = 0; i < quotes.length; i++) {
                
            }
            console.log(quotes)
        })
        
    return (
        <nav className="nav">
            <ReactLogo />
            <ul className="navigation-items">
              <li>Pricing</li>
              <li>About</li>
              <li>Contact</li>
              {/* <p>{stuff}</p> */}
            </ul>
        </nav>
    )
}

function Footer() {
    return (
        <div>
          <small>© All Rights Reserved.</small>
        </div>
    )
}

function MainSection() {
    return (
        <div>
          <h1>Reasons I love React</h1>
            <ol>
                <li>It's reusable</li>
                <li>It seems to be the right choice for my problems</li>
                <li>It's cross-platform</li>
            </ol>
        </div>
    )
}