const router = require("express").Router();
const axios = require('axios').default;
/* var request = require('request'); */

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



router.get("/ftnt", (req, res, next) => {
  
  axios.get(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=KDMP5TP4UWMJKYWX")
     .then(data => {
      let jsonData = data.data;
      let value = jsonData['Time Series (Daily)']
      let price = Object.values(value)


      console.log("ya tengo el array ", price[99]['4. close']
      )
      
    res.send("hola")
    })
     .catch(err => console.log(err));
})



module.exports = router;
