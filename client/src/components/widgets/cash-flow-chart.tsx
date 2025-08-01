import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCashFlowData } from "@/lib/mock-data";

export function CashFlowChart() {
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
        
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: mockCashFlowData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
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
            ticks: {
              callback: function(value: any) {
                return '$' + (value as number).toLocaleString();
              }
            }
          }
        }
      },
    });
      } catch (error) {
        console.error('Failed to load Chart.js:', error);
      }
    };

    loadChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cash Flow Overview</CardTitle>
          <select className="text-sm border border-border rounded px-3 py-1">
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <canvas ref={chartRef} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$72,000</p>
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">$45,000</p>
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[hsl(var(--app-purple))]">$27,000</p>
            <p className="text-sm text-muted-foreground">Net</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
