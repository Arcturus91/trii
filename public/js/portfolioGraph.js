
//const vantageKey = process.env.VANTAGE_KEY;

//Consultas:
/* Cómo agregar un key tipo process aquí? */
/* Cómo order el flow del api request para tener la data cuando la necesite. Necesito hacerlo síncrono.*/
/* Cuando borro el item del database directamente, me deja un undefined en ese instante */

const ctx = document.getElementById("myChart2").getContext("2d");
const betaHtml = document.getElementById("betaPortfolioID")

let url = window.location.href;

//setting up userId
let startPos = url.indexOf("profile/") + 8;
let userId = url.slice(startPos, startPos + 24).toUpperCase(); //24 is MONGO ID object length

//setting up URL base
if (url.indexOf("localhost:3000") > -1) {
  routeBeginning = "http://localhost:3000";
} else {
  routeBeginning = "https://trii-peru.herokuapp.com";
}

const pullStocks = () => {
  axios
    .get(`${routeBeginning}/auth/profile/${userId}/stocks`)
    .then((data) => {
      const stocksArray = data.data;

      stocksNames = stocksArray.map((stock) => stock.stock);
      stockValue = stocksArray.map(
        (stock) => Number(stock.quantity) * Number(stock.price)
      );
      let portfolio = {};
      let stocksBeta = {};
      let betaPort = 0;

      let sumPortfolio = stockValue.reduce((acc, val) => {
        return acc + val;
      });

      const myChart2 = new Chart(ctx, {
        type: "pie",
        data: {
          labels: stocksNames,
          datasets: [
            {
              label: "My portfolio",
              data: stockValue,
              backgroundColor: [
                `rgb(255, 109, 2)`,
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(255, 0, 0)",
                "rgb(0, 26, 255)",
                "rgb(94, 255, 0)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });

      stocksNames.forEach((element, idx) => {
        

          portfolio[element] = stockValue[idx] / sumPortfolio;
          //console.log("el portfolio ", portfolio)
          axios
          .get(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${element}&apikey=KDMP5TP4UWMJKYWX`
          )
          .then((rawData) => {
            jsonData = rawData.data;
            stocksBeta[jsonData.Symbol] = Number(jsonData.Beta);
            console.log("soy stocks beta", stocksBeta )
            if (idx === stocksNames.length - 1) {
              for (const key in portfolio) {

//aqui se podría agregar lo del error por si hay error en beta.

                betaPort += portfolio[key] * stocksBeta[key];
                //console.log("yo soy beta port", betaPort)
              }
              betaHtml.value = 'El Beta de tu portfolio es: '+ betaPort.toFixed(2)

//console.log("el tipo de betaport", typeof betaPort)

if(betaPort > 0){betaHtml.type = "text"}
              

              //console.log("json data del beta get", stocksBeta, betaPort);
            }
          });

      });
    })
    .catch((err) => {
      console.log("error con el axios get ", err);
    });
};
/* 
const button = document.getElementById("buttonPie");

button.addEventListener("click", pullStocks); */

document.addEventListener("DOMContentLoaded", pullStocks, false);

