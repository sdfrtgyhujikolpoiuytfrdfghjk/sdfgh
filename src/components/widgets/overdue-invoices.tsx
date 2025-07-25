import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMockInvoices } from "@/hooks/use-mock-data";
import { useConfetti } from "@/hooks/use-confetti";
import { useToast } from "@/hooks/use-toast";

export function OverdueInvoices() {
  const { data: invoices, isLoading } = useMockInvoices();
  const { triggerConfetti } = useConfetti();
  const { toast } = useToast();

  const overdueInvoices = invoices?.filter(invoice => invoice.status === 'overdue') || [];

  const handleSendReminders = () => {
    triggerConfetti();
    toast({
      title: "Reminders Sent!",
      description: `Payment reminders sent to ${overdueInvoices.length} clients`,
    });
  };

  if (isLoading) {
    return (
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Overdue Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overdue Invoices</CardTitle>
          <span className="text-2xl font-bold text-red-600">{overdueInvoices.length}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {overdueInvoices.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-red-900">{invoice.invoiceNumber}</p>
              <p className="text-sm text-red-700">Due: {invoice.dueDate.toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-900">${invoice.amount}</p>
              <p className="text-xs text-red-600">
                {Math.floor((Date.now() - invoice.dueDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          </div>
        ))}
        
        {overdueInvoices.length > 0 && (
          <Button 
            onClick={handleSendReminders}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Send Reminders
          </Button>
        )}
        
        {overdueInvoices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No overdue invoices</p>
            <p className="text-sm">Great job staying on top of collections!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
