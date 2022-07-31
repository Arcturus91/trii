const router = require("express").Router();
const axios = require('axios').default;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.post("/stockData", (req, res, next) => {

  const {stock} = req.body
  const stockUpper= stock.toUpperCase()
console.log("yo soy el req body", stockUpper)
res.redirect(`/stockData/${stockUpper}`)

})





//Company overview
//https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX
router.get("/stockData/:id", (req, res, next) => {
  const {id} = req.params
  
  axios.get(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=KDMP5TP4UWMJKYWX`)
     .then(data => {
      const stockData = data.data

      console.log("ya tengo el objeto", stockData["Symbol"])
      
    res.render("stocks/stockData",{stockData})
    })
     .catch(err => console.log(err));
})



module.exports = router;
