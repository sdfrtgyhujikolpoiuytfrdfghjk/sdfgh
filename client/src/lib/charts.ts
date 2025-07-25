// Chart.js configuration and defaults
// Components are registered dynamically in chart components to avoid import errors

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'hsl(214.3, 31.8%, 91.4%)',
      },
    },
  },
};

export const purpleTheme = {
  primary: 'hsl(275, 100%, 25%)',
  secondary: 'hsl(142, 71%, 45%)',
  danger: 'hsl(0, 84%, 60%)',
  warning: 'hsl(43, 96%, 56%)',
  info: 'hsl(221, 83%, 53%)',
};
