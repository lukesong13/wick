// All DOM elements used in the project are selected and exported here

export const elements = {
    inputForm: document.getElementById("input-form"),
    tickerInput: document.getElementById("ticker"),
    startInput: document.getElementById("start"),
    endInput: document.getElementById("end"),

    aaplPrice: document.getElementById("aapl-price"),
    binancePrice: document.getElementById("binance-price"),
    vooPrice: document.getElementById("voo-price"),
    nvdaPrice: document.getElementById("nvda-price"),
  
    aaplScroll: document.getElementById("aapl-scroll"),
    vooScroll: document.getElementById("voo-scroll"),
    nvdaScroll: document.getElementById("nvda-scroll"),
    binanceScroll: document.getElementById("binance-scroll"),
    msftScroll: document.getElementById("msft-scroll"),
    amznScroll: document.getElementById("amzn-scroll"),
    googlScroll: document.getElementById("googl-scroll"),
    metaScroll: document.getElementById("meta-scroll"),
    tslaScroll: document.getElementById("tsla-scroll"),
    amdScroll: document.getElementById("amd-scroll"),
    nflxScroll: document.getElementById("nflx-scroll"),
  
    stockInfoTable: document.getElementById("stock-info"),
    stockInfoTableBody: document.getElementById("stock-info-table-body"),
    chartContainerId: "chartContainer" // we just pass the id to CanvasJS
  };