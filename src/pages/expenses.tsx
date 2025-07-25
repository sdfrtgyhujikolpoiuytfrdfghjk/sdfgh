import { useState } from "react";
import { CloudUpload, Check, Eye, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMockExpenses } from "@/hooks/use-mock-data";
import { useToast } from "@/hooks/use-toast";
import { useConfetti } from "@/hooks/use-confetti";

export default function Expenses() {
  const { data: expenses, isLoading } = useMockExpenses();
  const { toast } = useToast();
  const { triggerConfetti } = useConfetti();

  const handleUpload = () => {
    toast({
      title: "Processing Documents",
      description: "AI is analyzing your uploaded receipts...",
    });
    
    setTimeout(() => {
      triggerConfetti();
      toast({
        title: "Documents Processed!",
        description: "12 expenses categorized automatically with 94% confidence",
      });
    }, 3000);
  };

  const handleApproveSelected = () => {
    triggerConfetti();
    toast({
      title: "Expenses Approved",
      description: "Selected expenses have been approved and processed",
    });
  };

  const handleResolveExpense = (expenseId: string) => {
    toast({
      title: "Expense Resolved",
      description: "The flagged expense has been reviewed and approved",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses?.reduce((sum, exp) => sum + parseFloat(exp.amount), 0) || 0;
  const pendingExpenses = expenses?.filter(exp => exp.status === 'pending') || [];
  const flaggedExpenses = expenses?.filter(exp => exp.status === 'flagged') || [];
  const aiCategorizedCount = expenses?.filter(exp => exp.aiCategorized).length || 0;
  const aiCategorizedPercentage = expenses?.length ? Math.round((aiCategorizedCount / expenses.length) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-1">Upload and categorize business expenses with AI assistance</p>
        </div>
        <Button onClick={handleApproveSelected} className="bg-[hsl(var(--app-purple))] hover:bg-[hsl(var(--app-purple))]/90">
          <Check className="w-4 h-4 mr-2" />
          Approve Selected
        </Button>
      </div>

      {/* Upload Zone */}
      <Card className="card-hover">
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center drag-zone">
            <div className="w-16 h-16 bg-[hsl(var(--app-purple))]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CloudUpload className="w-8 h-8 text-[hsl(var(--app-purple))]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Upload Expense Documents</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop receipts, invoices, or bank statements. AI will automatically categorize and extract data.
            </p>
            <Button onClick={handleUpload} className="bg-[hsl(var(--app-purple))] hover:bg-[hsl(var(--app-purple))]/90">
              Choose Files
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Supports PDF, JPG, PNG, CSV up to 10MB each</p>
          </div>
        </CardContent>
      </Card>

      {/* Expense Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">💳</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground">{pendingExpenses.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600">⏰</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Items</p>
                <p className="text-2xl font-bold text-foreground">{flaggedExpenses.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Flag className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Categorized</p>
                <p className="text-2xl font-bold text-foreground">{aiCategorizedPercentage}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">⚡</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <div className="flex items-center space-x-3">
              <select className="px-3 py-2 border border-border rounded-lg text-sm">
                <option>All Categories</option>
                <option>Office Supplies</option>
                <option>Travel</option>
                <option>Software</option>
                <option>Meals & Entertainment</option>
              </select>
              <input 
                type="text" 
                placeholder="Search expenses..." 
                className="px-3 py-2 border border-border rounded-lg text-sm w-48"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[hsl(var(--app-gray))]">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="w-4 h-4 text-[hsl(var(--app-purple))] border-border rounded" />
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Description</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Amount</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses?.map((expense) => (
                  <tr key={expense.id} className="hover:bg-[hsl(var(--app-gray))] transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 text-[hsl(var(--app-purple))] border-border rounded" />
                    </td>
                    <td className="py-4 px-6 text-muted-foreground text-sm">
                      {expense.date.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground">{expense.description}</div>
                      {expense.aiCategorized && (
                        <div className="text-xs text-[hsl(var(--app-purple))]">AI Categorized</div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary">{expense.category}</Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${expense.amount}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={
                        expense.status === 'approved' ? 'default' :
                        expense.status === 'flagged' ? 'destructive' :
                        'secondary'
                      }>
                        {expense.status === 'flagged' && <Flag className="w-3 h-3 mr-1" />}
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {expense.status === 'flagged' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResolveExpense(expense.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
