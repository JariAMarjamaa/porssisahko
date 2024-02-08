export const mockTestPrices = [
{ aikaleima_suomi: '1111-11-11T00:00', hinta: '100' },
{ aikaleima_suomi: '2222-12-22T01:00', hinta: '1' }
];

export const mockTestPriceData = {
    datasets: [
      {
        label: 'Pohjoismaiden Sähköpörssin sähkön hinta',
        data: mockTestPrices,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

export const mockTestPriceOptions = {
    scales: {
      x: {
        type: 'category',
        labels: ["11.11.1111 - 00.00", "22.12.2222 - 01.00"],
        angleLines: {
          display: true,
          color: 'black', 
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