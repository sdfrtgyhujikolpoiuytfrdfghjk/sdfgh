import { useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMockClients, useMockNotifications } from "@/hooks/use-mock-data";

export function Header() {
  const [selectedClient, setSelectedClient] = useState("TechStart Inc.");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: clients } = useMockClients();
  const { data: notifications } = useMockNotifications();

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Client Selector */}
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => setShowClientDropdown(!showClientDropdown)}
            >
              <span className="text-sm font-medium">{selectedClient}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            {showClientDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Clients
                </div>
                {clients?.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client.name);
                      setShowClientDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded"
                  >
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t pt-2 mt-2">
                  <button className="w-full px-3 py-2 text-left text-[hsl(var(--app-purple))] hover:bg-gray-100 rounded flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Client
                  </button>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {notifications && notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications?.map((notification) => (
                  <div key={notification.id} className="p-4 border-b last:border-b-0">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            )}
          </div>

          {/* User Menu */}
        </div>
      </div>
    </header>
  );
}