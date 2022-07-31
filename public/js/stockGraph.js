const ctx = document.getElementById("myChart").getContext("2d");

let url = window.location.href;
let startPos = url.indexOf("stockData/") + 10;
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
          borderColor:'#fff',
          pointBackgroundColor:'rgb(189,195,199)',
          
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        radius:2,
        hitRadius:30,
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    /*    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date.reverse(),
            datasets: [{
                label: ticker,
                data: priceArray.reverse(),
                borderWidth: 1,
                
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }); */
  })
  .catch((err) => console.log(err));
