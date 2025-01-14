import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/appSidebar";
import { useState } from "react";

export const Route = createFileRoute("/_chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div >
      <SidebarProvider>
        <AppSidebar/>
        <main>
          <SidebarTrigger />
          <Outlet/>
        </main>
      </SidebarProvider>
    </div>
  );
}
