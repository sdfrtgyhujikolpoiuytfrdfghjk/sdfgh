import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  BarChart3, 
  Settings,
  Calculator,
  ChevronDown,
  Plus
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invoicing", href: "/invoicing", icon: FileText },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Payroll", href: "/payroll", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const clients = [
  { id: "1", name: "TechStart Inc.", industry: "Technology", status: "active" },
  { id: "2", name: "Downtown Cafe", industry: "Restaurant", status: "active" },
  { id: "3", name: "Green Energy Co.", industry: "Energy", status: "pending" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

  return (
    <aside className="w-64 app-black text-white flex-shrink-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 app-purple rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">AI Accounting</span>
        </div>
      </div>

      {/* Client Selector */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <button
            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-2 h-2 rounded-full",
                selectedClient.status === "active" ? "bg-green-500" : "bg-yellow-500"
              )} />
              <div className="text-left">
                <p className="text-sm font-medium">{selectedClient.name}</p>
                <p className="text-xs text-gray-400">{selectedClient.industry}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {isClientDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Clients
                </div>
                {clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client);
                      setIsClientDropdownOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-gray-700 rounded-md"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      client.status === "active" ? "bg-green-500" : "bg-yellow-500"
                    )} />
                    <div className="text-left">
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-gray-400">{client.industry}</p>
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <Link
                    href="/onboarding"
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-app-purple hover:bg-gray-700 rounded-md"
                    onClick={() => setIsClientDropdownOpen(false)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Client</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href || 
            (item.href === "/dashboard" && location === "/");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 sidebar-hover",
                isActive 
                  ? "bg-gradient-to-r from-purple-600/20 to-purple-500/10 text-app-purple" 
                  : "text-gray-300 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 app-purple rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
