import { useEffect, useRef } from "react";

interface CashFlowChartProps {
  data: {
    labels: string[];
    income: number[];
    expenses: number[];
  };
  height?: number;
}

export default function CashFlowChart({ data, height = 300 }: CashFlowChartProps) {
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
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Income",
                data: data.income,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Expenses",
                data: data.expenses,
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                tension: 0.4,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "#1F2937",
                titleColor: "#F9FAFB",
                bodyColor: "#F9FAFB",
                borderColor: "#374151",
                borderWidth: 1,
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
                ticks: {
                  callback: function (value: any) {
                    return "$" + Number(value).toLocaleString();
                  },
                },
              },
            },
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
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
  }, [data]);

  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={chartRef} />
    </div>
  );
}