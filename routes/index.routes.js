const router = require("express").Router();
const axios = require("axios").default;

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

      res.render("stocks/stockData", { stockData });
    })
    .catch((err) => console.log(err));
});

router.get("/education/educationPage", (req, res) => {
  res.render("education/educationPage");
});

router.get("/education/educationList", (req, res) => {
  res.render("education/educationList");
});

router.get("/balanceSheet/:stockName", (req, res) => {
const {stockName} = req.params

axios
.get(
  `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockName}&apikey=KDMP5TP4UWMJKYWX`
)
.then((data) => {
  const balanceData = data.data;

  console.log("ya tengo el balance", balanceData.annualReports);
  
  res.send("hola")
})
.catch((err) => console.log(err));
})

router.get("/incomeStatement/:stockName", (req, res) => {
  const {stockName} = req.params
  
  axios
  .get(
    `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockName}&apikey=KDMP5TP4UWMJKYWX`
  )
  .then((data) => {
    const incomeData = data.data;
  
    console.log("ya tengo el income", incomeData.annualReports);
    
    res.send("hola")
   
  })
  .catch((err) => console.log(err));
  })

  router.get("/cashFlow/:stockName", (req, res) => {
    const {stockName} = req.params
    
    axios
    .get(
      `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${stockName}&apikey=KDMP5TP4UWMJKYWX`
    )
    .then((data) => {
      const cashFlowData = data.data;
      const datapoint = cashFlowData.annualReports[0]
      console.log("ya tengo el cash flow", datapoint);
      
      
  
      res.send("hola")
    })
    .catch((err) => console.log(err));
    })


module.exports = router;
