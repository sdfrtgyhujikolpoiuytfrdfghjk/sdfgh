import { useEffect, useRef } from "react";

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
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    let Chart: any;
    
    const loadChart = async () => {
      try {
        const chartModule = await import('chart.js');
        Chart = chartModule.Chart;
        
        // Register required components
        const { registerables } = chartModule;
        Chart.register(...registerables);
        
        if (!chartRef.current || !Chart) return;

        // Destroy existing chart
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        chartInstance.current = new Chart(ctx, {
          type: "bar",
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
                  label: function (context: any) {
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
                      callback: function (value: any) {
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
                      callback: function (value: any) {
                        return "$" + Number(value).toLocaleString();
                      },
                    }
                  : undefined,
              },
            },
          },
        });
      } catch (error) {
        console.error('Failed to load Chart.js:', error);
        // Fallback: show a simple text representation
        if (chartRef.current) {
          const ctx = chartRef.current.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#6B7280";
            ctx.font = "14px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Chart unavailable", chartRef.current.width / 2, chartRef.current.height / 2);
          }
        }
      }
    };

    loadChart();

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