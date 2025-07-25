import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfettiButton } from "@/components/ui/confetti";
import PieChart from "@/components/charts/PieChart";
import { Plus, Download, Send, Edit, Eye, Check, Lightbulb } from "lucide-react";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { fetchInvoices, mockClients } from "@/lib/mockData";

const invoiceStatusData = {
  labels: ["Paid", "Pending", "Overdue"],
  values: [65, 25, 10],
  colors: ["#10B981", "#F59E0B", "#EF4444"],
};

export default function InvoicingPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    clientId: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: fetchInvoices,
  });

  const totalOutstanding = invoices
    .filter(invoice => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const paidThisMonth = invoices
    .filter(invoice => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const overdueAmount = invoices
    .filter(invoice => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const overdueCount = invoices.filter(invoice => invoice.status === "overdue").length;

  const handleCreateInvoice = () => {
    // Mock invoice creation
    setShowCreateModal(false);
    setInvoiceForm({ clientId: "", amount: "", description: "", dueDate: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Invoicing</h1>
          <p className="text-app-text-secondary mt-1">
            Manage invoices and track payments
          </p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="app-purple text-white hover:bg-app-purple-light flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Invoice</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            
            {/* AI Suggestion Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-app-text">AI Auto-Fill Suggestion</p>
                  <p className="text-xs text-app-text-secondary mt-1">
                    Based on previous invoices, I suggest billing TechStart Inc for monthly consulting services at $3,500.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Select
                    value={invoiceForm.clientId}
                    onValueChange={(value) =>
                      setInvoiceForm({ ...invoiceForm, clientId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={invoiceForm.amount}
                    onChange={(e) =>
                      setInvoiceForm({ ...invoiceForm, amount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Invoice description..."
                  value={invoiceForm.description}
                  onChange={(e) =>
                    setInvoiceForm({ ...invoiceForm, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceForm.dueDate}
                  onChange={(e) =>
                    setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <ConfettiButton
                  onClick={handleCreateInvoice}
                  className="app-purple text-white px-4 py-2 rounded-lg hover:bg-app-purple-light"
                >
                  Create & Send
                </ConfettiButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Suggestion Banner */}
      {overdueCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">AI Recommendation</p>
                <p className="text-sm text-yellow-700">
                  You have {overdueCount} overdue invoices. Would you like me to send payment reminders?
                </p>
              </div>
            </div>
            <ConfettiButton className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm font-medium">
              Send Reminders
            </ConfettiButton>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Total Outstanding</p>
              <p className="text-2xl font-bold text-app-text mt-2">
                {formatCurrency(totalOutstanding)}
              </p>
            </div>
            <PieChart
              data={{
                labels: ["Outstanding", "Paid"],
                values: [totalOutstanding, paidThisMonth],
                colors: ["#F59E0B", "#10B981"],
              }}
              height={80}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Paid This Month</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {formatCurrency(paidThisMonth)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-app-text-secondary text-sm">Overdue Amount</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {formatCurrency(overdueAmount)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">{overdueCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Table and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-app-text">Recent Invoices</h3>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-48"
                />
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="app-gray">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-app-text-secondary text-sm">
                    Invoice
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-app-text-secondary text-sm">
                    Client
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-app-text-secondary text-sm">
                    Amount
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-app-text-secondary text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-app-text-secondary text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-app-gray transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-app-text">{invoice.number}</div>
                      <div className="text-sm text-app-text-secondary">
                        {invoice.description}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-app-text">{invoice.clientName}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-app-text">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {invoice.status === "overdue" && (
                          <ConfettiButton className="text-amber-600 hover:text-amber-700 text-xs font-medium">
                            <Send className="w-4 h-4" />
                          </ConfettiButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Status Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-app-text mb-4">Invoice Status</h3>
          <PieChart data={invoiceStatusData} height={200} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Paid</span>
              </div>
              <span className="font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Pending</span>
              </div>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Overdue</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
