const router = require("express").Router();
const axios = require("axios").default;
const arrayTextToNumber = require("../utils/arrayTextToNumber");


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

      console.log("ya tengo el objeto", stockData);

      axios
      .get(
        `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
      )
      .then((cashflow) => {
        const cashFlowData = cashflow.data;
        const lastAnnualCashFlow = cashFlowData.annualReports[0]
        console.log("ya tengo el cash flow", arrayTextToNumber(lastAnnualCashFlow));

        axios
        .get(
          `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
          )
        .then((balanceSheet) => {
          const balanceSheetData = balanceSheet.data;
          const lastAnnualBalanceSheet= balanceSheetData.annualReports[0]
          console.log("ya tengo el balance sheet ",arrayTextToNumber(lastAnnualBalanceSheet))

          axios
          .get(
            `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`
            )
          .then((incomeStatement) => {
            const incomeStatementData = incomeStatement.data;
            const lastAnnualIncomeStatement= incomeStatementData.annualReports[0]
            console.log("ya tengo el income statement ",arrayTextToNumber(lastAnnualIncomeStatement))
  
  



            res.render("stocks/stockData", { stockData,lastAnnualCashFlow,lastAnnualBalanceSheet,lastAnnualIncomeStatement });

          })




        })
      })
    })




    .catch((err) => console.log(err));
});

router.get("/education/educationPage", (req, res) => {
  res.render("education/educationPage");
});

router.get("/education/educationList", (req, res) => {
  res.render("education/educationList");
});




module.exports = router;
