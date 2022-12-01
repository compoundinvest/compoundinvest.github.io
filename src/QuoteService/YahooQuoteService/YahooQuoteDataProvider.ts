import axios from "axios";
import { YahooQuotes, StockOverview } from "./Entity/YahooQuotes";

export function fetchYahooQuotes(tickers: string[]): StockOverview[] {
    const yahooAPIStockURL: string = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + tickers.join(",");
    var quotes: StockOverview[] = [];

    axios.get<YahooQuotes>(yahooAPIStockURL).then(function (response) {
        quotes = response.data.quoteResponse.result;
    });

    return quotes;
}

/*
https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,AMZN,GOOG,GOOGL,FB,TSLA,BABA,HSBC,BP,V,VOD,NVDA,JPM,DEO,BGNE,JNJ,WMT,CX,UNH,MA,BHP,BAC,PYPL,HD,PG,DIS,CCZ,LFC,ASML,ADBE,XOM,CMCSA,SHI,ACH,NKE,KO,NFLX,VZ,NGG,INTC,CRM,CSCO,LLY,ORCL,PFE,NVS,CVX,T,PEP,ABT,ABBV,TCP,MRK,TMO,WFC,NVO,DHR,AVGO,ACN,SHOP,TMUS,UPS,COST,TXN,MCD,SAP,MDT,MS,UL,PBR,QCOM,PM,HON,BMY,LIN,C,SE,UNP,BA,NEE,AMGN,SCHW,HDB,CHTR,AXP,BLK,SBUX,INTU,SNY,RTX,SNE,IBM,TD,JD,GS,AMAT,TGT,AMT,CAT,VALE,GE,EL,MMM,CVS,ZM,DE,SQ,NOW,ISRG,LMT,AMD,SNAP,GSK,SPGI,SYK,UBER,BKNG,ANTM,PTR,MU,FIS,BTI,PLD,INFY,LRCX,ZTS,MDLZ,MRNA,MO,BUD,USB,WPP,GILD,CCI,GM,ADP,GWPH,COP,TJX,BAM,PNC,CI,ENB,BNS,CME,AZN,SPCE,HNRG,ARLP,AA,AAL,BKR,CCL,CHK,DAL,HAL,HP,HCR,HLT,KMI,KLXE,LNC,IRS,M,MPC,NYMT,NCLH,NTNX,OXY,OMC,PK,PBF,PENN,RCL,SLB,LUV,SU,FTI,TRGP,UAL,VLO,WDC,WES,WYND,GPS,SABR,FOSL,GLLL,BBBY,VEON,AES,EDP,EAT
*/
