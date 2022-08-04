const ctx = document.getElementById("myChart2").getContext("2d");

const myChart2 = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["FTNT", "AMD", "GOOG","NVDA"],
    datasets: [
      {
        label: "My First Dataset",
        data: [25, 25,25,25],
        backgroundColor: [
          "rgb(255, 109, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 25, 130)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

