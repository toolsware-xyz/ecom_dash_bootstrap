
function pieChart(idName, series, width, height) {
  var optionsPie = {
    series: series,
    labels: ['Completed', 'Target', 'In Progress'],
    colors: ['#5840FF', '#FB3586', '#FA8B0C'],
    chart: {
      type: 'pie',
      group: 'social',
      width: width,
      height: height,
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '16px',
      fontFamily: 'Jost, sans-serif',
      fontWeight: 400,
      labels: {
        colors: '#8C90A4',
    },
      markers: {
        width: 7,
        height: 7,
        radius: 20,
        offsetX: -4,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
            minAngleToShowLabel: undefined
        },     
      }
    },
    responsive: [{
      breakpoint: 1399,
      options: {
        chart: {
          width: "100%"
        },
      }
    }]
  };
  if ($(idName).length > 0) {
    new ApexCharts(document.querySelector(idName), optionsPie).render();
  }
}

pieChart('#apexPie',[20, 60, 20, ],'100%',330);
pieChart('#apexPie2',[20, 60, 20, ],'100%',490);
