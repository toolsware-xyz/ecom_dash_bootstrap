/* custom tooltip */
const customTooltips = function (context) {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, i) {
      const colors = tooltipModel.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });
    innerHtml += '</tbody>';

    let tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const toolTip = document.querySelector('.chartjs-tooltip');
  const position = context.chart.canvas.getBoundingClientRect();
  const toolTipHeight = toolTip.clientHeight;
  const rtl = document.querySelector('html[dir="rtl"]');


  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
  tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY-(tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}

/* line chart four */
function chartjsLineChartFourExtra(selector, height = "125", dataCur, labels, dataBwidth) {
  let delayed;
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = window.innerWidth <= 1599 ? 147 : height;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          data: dataCur,
          borderColor: '#5840FF',
          borderWidth: dataBwidth,
          label: "Sales",
          pointStyle: "circle",
          pointRadius: "0",
          hoverRadius: "5",
          pointBorderColor: "#5840FF",
          pointBackgroundColor: "#5840FF",
          hoverBorderWidth: 1,
          tension:0.4,
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label}K</span>`;
              }
            },
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 200 + context.datasetIndex * 50;
            }
            return delay;
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            stacked: false,
            grid: {
              display: true,
              color: "#485e9029",
              drawBorder: false,
              tickMarkLength: 0,
              zeroLineColor: '#485e9029',
              borderDash: [4, 4],
            },
            ticks: {
              beginAtZero: false,
              font: {
                size: 13,
              },
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 20,
              min: 0,
              padding: 15,
              callback: function (label, index, labels) {
                return label + "k";
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              font: {
                size: 13,
              },
              display: true,
            },
          },
        },
      },
    });
  }
}
chartjsLineChartFourExtra(
  "myChart6TExtra",
  "86",
  (data = [25,40, 30, 45, 40, 50, 25, 70, 35, 40, 26, 58]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
);

/* line chart small */
function chartjsLineChartSmall(
  selector,
  bgColor = "#20C99700",
  bColor = "#20C997",
  data = [5, 10, 20, 25, 20, 30]
) {
  let delayed;
  var ctx = document.querySelectorAll(selector);
  if (ctx) {
    ctx.forEach(function (elm, id) {
      elm.getContext("2d");
      elm.height = 30;
      elm.width = 120;
      var chart = new Chart(elm, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
            backgroundColor: bgColor,
            borderColor: bColor,
            data: data,
            borderWidth: 3,
            tension:0.4,
            fill: false,
          }, ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins:{
            legend: {
              display: false,
            },
            toolTip:{
              display: false,
            }
          },
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 200 + context.datasetIndex * 50;
              }
              return delay;
            },
          },
          layout: {
            padding: {
              left:0,
              right: 0,
              top: 0,
              bottom: -10,
            },
          },
          legend: {
            display: false,
            labels: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            y: {
              stacked: false,
              grid: {
                display: false,
                tickMarkLength: 0,
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
            x: {
              stacked: false,
              grid: {
                display: false,
                drawBorder: false,
              },

              ticks: {
                display: false,
              },
            },
          },
        },
      });
    });
  }
}

chartjsLineChartSmall(".lineChartSm1");
chartjsLineChartSmall(
  ".lineChartSm2",
  (bgColor = "#20C99700"),
  (bColor = "#FF69A5"),
  (data = [0, 10, 8, 14, 7, 10])
);

chartjsLineChartSmall(
  ".lineChartSm3",
  (bgColor = "#20C99700"),
  (bColor = "#5F63F2"),
  (data = [5, 15, 5, 11, 17, 11])
);

chartjsLineChartSmall(
  ".lineChartSm4",
  (bgColor = "#20C99700"),
  (bColor = "#2C99FF"),
  (data = [4, 16, 9, 24, 8, 16])
);

chartjsLineChartSmall(
  ".lineChartSm5",
  (bgColor = "#20C99700"),
  (bColor = "#FA8B0C"),
  (data = [0, 10, 8, 14, 7, 10])
);

/* Chart Page */

/* ======= Bar chart ======= */
function chartjsBarChartVertical(selector, label = "Bar chart vertical") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
            barPercentage: 0.6,
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          y: {
            grid: {
              color: "#485e9029",
            },
            ticks: {
              beginAtZero: true,
              font:{
                size:14,
              },
              color: "#182b49",
              max: 80,
              stepSize: 20,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              font:{
                size:11,
              },
              color: "#182b49",
            },
          },
        },
      },
    });
  }
}
chartjsBarChartVertical("barChartVertical");

/* ======= horizontalBar chart ======= */
function chartjsBarChartHorizontal(selector, label = "Bar chart horizontal") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
            barPercentage: 0.6,
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          y: {
            grid: {
              color: "#485e9029",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
            },
          },
          y:{
            grid: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              font:{
                size:11,
              },
              fontColor: "#182b49",
            },
          },
        },
      },
      plugins: {
        legend: {
          position: 'right',
        },
      }
    });
  }
}
chartjsBarChartHorizontal("barChartHorizontal");

/* ======= Donut  chart ======= */

function chartjsDoughnut(selector, cHeight, data) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = cHeight;
    var chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["30", "30", "40"],
        datasets: [{
          data: data,
          backgroundColor: ['#fb3586', '#5840FF', '#FA8B0C'],
          borderColor: "transparent",
          total: "9,283",
          hoverOffset: 8
        }, ],
      },
      options: {
        aspectRatio: 1.5,
        responsive: true,
        borderWidth: 10,
        cutoutPercentage: 30,
        maintainAspectRatio: true,
      },
    });
  }
}
chartjsDoughnut("chartDoughnut", 60, (data = [30, 30, 40]));