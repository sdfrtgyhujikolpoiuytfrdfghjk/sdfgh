import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { useMockAIInsights } from "@/hooks/use-mock-data";

export function AIInsights() {
  const { data: insights, isLoading } = useMockAIInsights();

  if (isLoading) {
    return (
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-[hsl(var(--app-purple))]" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-[hsl(var(--app-purple))]" />
            <span>AI Insights</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-[hsl(var(--app-purple))] hover:text-[hsl(var(--app-purple))]/80">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight.id}
            className="p-4 bg-white rounded-lg border border-purple-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                insight.severity === 'high' ? 'bg-red-500' :
                insight.severity === 'medium' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900">{insight.title}</p>
                <p className="text-xs text-purple-700 mt-1">{insight.description}</p>
                {insight.actionable && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-[hsl(var(--app-purple))] hover:text-[hsl(var(--app-purple))]/80 mt-2 p-0 h-auto"
                  >
                    Review →
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
