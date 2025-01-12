import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
export function AppSidebar() {
  const queryClient = useQueryClient();
  const router = useRouter()
  function onClick(){
    localStorage.clear();
    queryClient.clear();
    router.navigate({ to: '/auth/login' })
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton>
                Settings
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button type = 'submit' onClick={onClick}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}