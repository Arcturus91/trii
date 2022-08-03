const router = require("express").Router();
const axios = require("axios").default;
const { Router } = require("express");
const arrayTextToNumber = require("../utils/arrayTextToNumber");
const customFinancialRatios = require("../utils/customFinancialRatios")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/stockData", (req, res, next) => {
  const { stock } = req.body;
  const stockUpper = stock.toUpperCase();
  console.log("yo soy el req body", stockUpper);
  res.redirect(`/stockData/${stockUpper}`);
});

//Company overview
//https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX
router.get("/stockData/:id", (req, res, next) => {
  const { id } = req.params;

  axios
    .get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
    )
    .then((data) => {
      const stockData = data.data;
     

      console.log(
        "ya tengo el objeto",
        stockData
      );

      axios
        .get(
          `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
        )
        .then((cashflow) => {
          const cashFlowData = cashflow.data;
          const lastAnnualCashFlow =  arrayTextToNumber(cashFlowData.annualReports[0]);
          console.log(
            "ya tengo el cash flow",
           lastAnnualCashFlow
          );

          axios
            .get(
              `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
            )
            .then((balanceSheet) => {
              const balanceSheetData = balanceSheet.data;
              const lastAnnualBalanceSheet = arrayTextToNumber(balanceSheetData.annualReports[0]);
              const lastQuarterlyBalanceSheet = arrayTextToNumber(balanceSheetData.quarterlyReports[0])
              console.log(
                "ya tengo el último balance sheet quarterly",
                lastQuarterlyBalanceSheet 
              );

              axios
                .get(
                  `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
                )
                .then((incomeStatement) => {
                  const incomeStatementData = incomeStatement.data;
                  const lastAnnualIncomeStatement =
                  arrayTextToNumber(incomeStatementData.annualReports[0]);
                  console.log(
                    "ya tengo el income statement ",
                    lastAnnualIncomeStatement)
                  
                    const {
                      MarketCapitalization,
                      EBITDA,
                      ProfitMargin,
                      OperatingMarginTTM,
                      ReturnOnAssetsTTM,
                      ReturnOnEquityTTM,
                      RevenueTTM,
                      GrossProfitTTM,
                    } = stockData;

                    const {totalNonCurrentLiabilities,totalShareholderEquity} =lastQuarterlyBalanceSheet
//note those 2 last values are the last avaibles in the moment of the analysis. I mean, are the LTM
                    const roce = customFinancialRatios(RevenueTTM,OperatingMarginTTM,totalNonCurrentLiabilities,totalShareholderEquity)


                    console.log("roce", roce, OperatingMarginTTM,totalNonCurrentLiabilities,totalShareholderEquity)


                  res.render("stocks/stockData", {
                    stockData,
                    lastAnnualCashFlow,
                    lastAnnualBalanceSheet,
                    lastAnnualIncomeStatement,roce,lastQuarterlyBalanceSheet
                  });
                });
            });
        });
    })

    .catch((err) => console.log(err));
});



module.exports = router;
