import { useEffect, useRef } from "react";

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
  };
  height?: number;
}

export default function PieChart({
  data,
  height = 200,
}: PieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const defaultColors = [
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#F97316", // Orange
  ];

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
          type: "doughnut",
          data: {
            labels: data.labels,
            datasets: [
              {
                data: data.values,
                backgroundColor: data.colors || defaultColors,
                borderWidth: 0,
                hoverBorderWidth: 2,
                hoverBorderColor: "#FFFFFF",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  usePointStyle: true,
                },
              },
              tooltip: {
                backgroundColor: "#1F2937",
                titleColor: "#F9FAFB",
                bodyColor: "#F9FAFB",
                borderColor: "#374151",
                borderWidth: 1,
                callbacks: {
                  label: function (context: any) {
                    const label = context.label || "";
                    const value = context.parsed;
                    const total = context.dataset.data.reduce(
                      (a: number, b: number) => a + b,
                      0
                    );
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${label}: ${percentage}%`;
                  },
                },
              },
            },
            cutout: "60%",
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