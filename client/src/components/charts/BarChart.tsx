import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  height?: number;
  horizontal?: boolean;
}

export default function BarChart({
  data,
  height = 300,
  horizontal = false,
}: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: horizontal ? "bar" : "bar",
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || "#4B0082",
          borderColor: dataset.borderColor || "#4B0082",
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: horizontal ? "y" : "x",
        plugins: {
          legend: {
            display: data.datasets.length > 1,
            position: "top",
          },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#F9FAFB",
            bodyColor: "#F9FAFB",
            borderColor: "#374151",
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || "";
                const value = context.parsed.y || context.parsed.x;
                return `${label}: $${Number(value).toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: !horizontal,
            },
            ticks: horizontal
              ? {
                  callback: function (value) {
                    return "$" + Number(value).toLocaleString();
                  },
                }
              : undefined,
          },
          y: {
            beginAtZero: true,
            grid: {
              display: horizontal,
            },
            ticks: !horizontal
              ? {
                  callback: function (value) {
                    return "$" + Number(value).toLocaleString();
                  },
                }
              : undefined,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, horizontal]);

  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={chartRef} />
    </div>
  );
}
