import { useQuery } from "@tanstack/react-query";
import { DragDropWidget, DropZone } from "@/components/ui/DragDropWidget";
import { ConfettiButton } from "@/components/ui/confetti";
import CashFlowChart from "@/components/charts/CashFlowChart";
import PieChart from "@/components/charts/PieChart";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/App";
import { Link } from "wouter";
import {
  TrendingUp,
  Clock,
  CreditCard,
  DollarSign,
  Lightbulb,
  Users,
  FileText,
  Upload,
  BarChart,
  Plus,
  Save,
  ArrowRight,
  Zap,
  Flag,
} from "lucide-react";
import { formatCurrency, formatPercent, getDaysOverdue, getStatusColor } from "@/lib/utils";
import { fetchInsights, fetchInvoices, fetchTransactions, mockInsights } from "@/lib/mockData";

const cashFlowData = {
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  income: [65000, 72000, 68000, 78000, 85000, 89000],
  expenses: [45000, 48000, 52000, 49000, 51000, 46000],
};

const overdueInvoicesData = {
  labels: ["Paid", "Pending", "Overdue"],
  values: [65, 25, 10],
  colors: ["#10B981", "#F59E0B", "#EF4444"],
};

export default function DashboardPage() {
  const { selectedClient } = useAppContext();

  const { data: insights = [] } = useQuery({
    queryKey: ["/api/insights"],
    queryFn: fetchInsights,
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: fetchInvoices,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["/api/transactions"],
    queryFn: fetchTransactions,
  });

  const overdueInvoices = invoices.filter(invoice => invoice.status === "overdue");
  const totalOutstanding = invoices
    .filter(invoice => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Dashboard</h1>
          <p className="text-app-text-secondary mt-1">
            Welcome back! Here's what's happening with{" "}
            <span className="font-medium">{selectedClient}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Layout</span>
          </Button>
          <Link href="/onboarding">
            <ConfettiButton className="app-purple text-white px-4 py-2 rounded-lg hover:bg-app-purple-light flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </ConfettiButton>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <DropZone id="kpi-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DragDropWidget id="revenue-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-app-text mt-2">
                {formatCurrency(127420)}
              </p>
              <p className="text-green-600 text-sm mt-1">
                +12.5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </DragDropWidget>

        <DragDropWidget id="outstanding-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Outstanding Invoices</p>
              <p className="text-2xl font-bold text-app-text mt-2">
                {formatCurrency(totalOutstanding)}
              </p>
              <p className="text-amber-600 text-sm mt-1">
                {overdueInvoices.length} invoices overdue
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </DragDropWidget>

        <DragDropWidget id="expenses-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Monthly Expenses</p>
              <p className="text-2xl font-bold text-app-text mt-2">
                {formatCurrency(31289)}
              </p>
              <p className="text-red-600 text-sm mt-1">+3% from budget</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </DragDropWidget>

        <DragDropWidget id="automation-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Tasks Automated</p>
              <p className="text-2xl font-bold text-app-text mt-2">156</p>
              <p className="text-app-purple text-sm mt-1">89% efficiency gain</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-app-purple" />
            </div>
          </div>
        </DragDropWidget>
      </DropZone>

      {/* Main Content Grid */}
      <DropZone id="main-content" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <DragDropWidget id="cash-flow-chart" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-app-text">Cash Flow Overview</h2>
            <select className="text-sm border border-gray-200 rounded px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <CashFlowChart data={cashFlowData} height={250} />
        </DragDropWidget>

        {/* AI Insights */}
        <DragDropWidget id="ai-insights" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 app-purple rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-app-text">AI Insights</h2>
          </div>

          <div className="space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-4 bg-white rounded-lg border border-purple-200"
              >
                <div className="flex items-start space-x-2">
                  {insight.type === "warning" && (
                    <Flag className="w-4 h-4 text-yellow-500 mt-0.5" />
                  )}
                  {insight.type === "opportunity" && (
                    <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  )}
                  {insight.type === "info" && (
                    <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-app-text">
                      {insight.title}
                    </p>
                    <p className="text-xs text-app-text-secondary mt-1">
                      {insight.description}
                    </p>
                    {insight.actionable && (
                      <ConfettiButton className="text-app-purple text-sm font-medium mt-2 hover:text-app-purple-light">
                        Review →
                      </ConfettiButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DragDropWidget>

        {/* Overdue Invoices */}
        <DragDropWidget id="overdue-invoices">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-app-text">Overdue Invoices</h3>
            <span className="text-2xl font-bold text-red-600">
              {overdueInvoices.length}
            </span>
          </div>
          <div className="space-y-3">
            {overdueInvoices.slice(0, 3).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-red-900">{invoice.number}</p>
                  <p className="text-sm text-red-700">{invoice.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-900">
                    {formatCurrency(invoice.amount)}
                  </p>
                  <p className="text-xs text-red-600">
                    {getDaysOverdue(invoice.dueDate)} days overdue
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ConfettiButton className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm font-medium">
            Send Reminders
          </ConfettiButton>
        </DragDropWidget>

        {/* Recent Transactions */}
        <DragDropWidget id="recent-transactions">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-app-text">Recent Transactions</h3>
            <Link href="/expenses">
              <Button variant="link" className="text-app-purple hover:text-app-purple-light">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-app-text">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-app-text-secondary">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold text-sm ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(Math.abs(transaction.amount))}
                </span>
              </div>
            ))}
          </div>
        </DragDropWidget>

        {/* Quick Actions */}
        <DragDropWidget id="quick-actions">
          <h3 className="text-lg font-semibold text-app-text mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/invoicing">
              <ConfettiButton className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-app-gray transition-colors w-full">
                <FileText className="w-6 h-6 text-app-purple mb-2" />
                <span className="text-sm font-medium text-app-text">New Invoice</span>
              </ConfettiButton>
            </Link>
            <Link href="/expenses">
              <ConfettiButton className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-app-gray transition-colors w-full">
                <Upload className="w-6 h-6 text-app-purple mb-2" />
                <span className="text-sm font-medium text-app-text">Upload Receipt</span>
              </ConfettiButton>
            </Link>
            <Link href="/payroll">
              <ConfettiButton className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-app-gray transition-colors w-full">
                <Users className="w-6 h-6 text-app-purple mb-2" />
                <span className="text-sm font-medium text-app-text">Run Payroll</span>
              </ConfettiButton>
            </Link>
            <Link href="/reports">
              <ConfettiButton className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-app-gray transition-colors w-full">
                <BarChart className="w-6 h-6 text-app-purple mb-2" />
                <span className="text-sm font-medium text-app-text">Generate Report</span>
              </ConfettiButton>
            </Link>
          </div>
        </DragDropWidget>
      </DropZone>
    </div>
  );
}
