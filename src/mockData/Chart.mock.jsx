export const mockChartData = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

export const mockChartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: ["MockPaiva 1", "MockPaiva 2", "MockPaiva 3"],
        angleLines: {
          display: true,
          color: 'red', 
          lineWidth: 1,
        },
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };