import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/appSidebar";
import { useSidebar } from "@/store/use-sidebar";


export const Route = createFileRoute("/_chat")({
  component: RouteComponent,
});

function RouteComponent() {

  const { isOpen, toggle } = useSidebar();

  return (
    <div >
      <SidebarProvider>
        <AppSidebar/>
        <main>
          <SidebarTrigger type="submit" onClick={toggle} />
          <Outlet/>
        </main>
      </SidebarProvider>
    </div>
  );
}
