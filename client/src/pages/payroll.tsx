import { useState } from "react";
import { Users, DollarSign, Calendar, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMockEmployees } from "@/hooks/use-mock-data";
import { useToast } from "@/hooks/use-toast";
import { useConfetti } from "@/hooks/use-confetti";

export default function PayrollPage() {
  const { data: employees, isLoading } = useMockEmployees();
  const { toast } = useToast();
  const { triggerConfetti } = useConfetti();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunPayroll = async () => {
    setIsProcessing(true);
    
    // Simulate payroll processing
    setTimeout(() => {
      setIsProcessing(false);
      triggerConfetti();
      toast({
        title: "Payroll Processed Successfully!",
        description: `Payroll for ${employees?.length || 0} employees has been processed`,
      });
    }, 3000);
  };

  const handleGeneratePayslip = (employeeId: string) => {
    triggerConfetti();
    toast({
      title: "Payslip Generated",
      description: "Payslip has been generated and sent to employee",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalSalaries = employees?.reduce((sum, emp) => sum + parseFloat(emp.salary), 0) || 0;
  const activeEmployees = employees?.filter(emp => emp.status === 'active') || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
          <p className="text-muted-foreground mt-1">Manage employee payroll and compensation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </Button>
          <Button 
            onClick={handleRunPayroll}
            disabled={isProcessing}
            className="bg-[hsl(var(--app-purple))] hover:bg-[hsl(var(--app-purple))]/90"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" />
                Run Payroll
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">{activeEmployees.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold text-foreground">${totalSalaries.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Pay Date</p>
                <p className="text-2xl font-bold text-foreground">Jan 31</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[hsl(var(--app-purple))]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Employees</CardTitle>
            <div className="flex items-center space-x-3">
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="px-3 py-2 border border-border rounded-lg text-sm w-48"
              />
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[hsl(var(--app-gray))]">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Role</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Salary</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {employees?.map((employee) => (
                  <tr key={employee.id} className="hover:bg-[hsl(var(--app-gray))] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[hsl(var(--app-purple))] rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">
                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground">{employee.role}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground">${employee.salary}</div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleGeneratePayslip(employee.id)}
                        >
                          Generate Payslip
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
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