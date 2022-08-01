const ctx = document.getElementById("myChart").getContext("2d");
let delayed
let url = window.location.href;

let startPos


if(url.indexOf("stockData/")!==-1){
  startPos = url.indexOf("stockData/") + 10;
} else if(url.indexOf("cashFlow/")!==-1){
  startPos = url.indexOf("cashFlow/") + 9
}



let ticker = url.slice(startPos).toUpperCase();

//gradient fill

let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0,'rgb(58,123,213,1');
gradient.addColorStop(1,'rgb(0,210,255,0.3');


axios
  .get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=KDMP5TP4UWMJKYWX`
  )
  .then((rawData) => {
    let jsonData = rawData.data;
    let value = jsonData["Time Series (Daily)"];
    let price = Object.values(value); // stock price Array with objects
    let date = Object.keys(value); //stock price date Array
    let priceArray = price.map((priceData) => priceData["4. close"]);

    const labels = date.reverse();
    const data = {
      labels,
      datasets: [
        {
          data: priceArray.reverse(),
          label: ticker,
          fill:true,
          backgroundColor: gradient,
          borderColor:'#ffffff',
          pointBackgroundColor:'#ffffff',
          
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        plugins: {
          legend: {
              display: true,
              labels: {
                  color: 'rgb(255, 255, 255)',
                  font: {
                    size: 20
                }
              }
          }
      },
        radius:2,
        hitRadius:30,
        responsive: true,
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 5 + context.datasetIndex * 1.5;
              }
              return delay;
            },
          },




        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
              color: 'rgb(255, 255, 255)',
              font: {
                size: 15
            }


            },
          },

          x: {
            ticks: {
              
              color: 'rgb(255, 255, 255)',
              font: {
                size: 15
            }


            },
          },


        },
      },
    };

    const myChart = new Chart(ctx, config);

 
  })
  .catch((err) => console.log(err));
