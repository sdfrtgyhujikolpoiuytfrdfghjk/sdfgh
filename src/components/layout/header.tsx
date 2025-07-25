import { useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMockClients, useMockNotifications } from "@/hooks/use-mock-data";

export function Header() {
  const [selectedClient, setSelectedClient] = useState("TechStart Inc.");
  const { data: clients } = useMockClients();
  const { data: notifications } = useMockNotifications();

  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Client Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <span className="text-sm font-medium">{selectedClient}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Clients
                </div>
                {clients?.map((client) => (
                  <DropdownMenuItem
                    key={client.id}
                    onClick={() => setSelectedClient(client.name)}
                    className="px-3 py-2"
                  >
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <div className="border-t pt-2 mt-2">
                  <DropdownMenuItem className="px-3 py-2 text-[hsl(var(--app-purple))]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Client
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications?.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-4 border-b last:border-b-0">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="w-2 h-2 bg-[hsl(var(--app-purple))] rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.client} • {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[hsl(var(--app-purple))] rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
