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
import { Link, useRouter } from "@tanstack/react-router";
export function AppSidebar() {
  const data = [
    {
      "chatId": "chat_67890",
      "senderId": "user_001",
      "recipientId": "user_002"
    },
    {
      "chatId": "chat_98765",
      "senderId": "user_101",
      "recipientId": "user_202"
    },
    {
      "chatId": "chat_54321",
      "senderId": "user_303",
      "recipientId": "user_404"
    },
    {
      "chatId": "chat_12345",
      "senderId": "user_505",
      "recipientId": "user_606"
    }
  ]
  
  const queryClient = useQueryClient();
  const router = useRouter()
  function onLogout(){
    localStorage.clear();
    queryClient.clear();
    router.navigate({ to: '/auth/login' })
  }
  function onChat(senderId:string,recipientId:string){
    router.navigate({
      to: `/chat/${senderId}/${recipientId}`,
      params: { senderId, recipientId },
    });
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Link to="/genreSelection">
              <SidebarMenuButton>
                Update Genre
              </SidebarMenuButton>
              </Link>
              <Link to="/genderSelection">
              <SidebarMenuButton>
                Update Gender
              </SidebarMenuButton>
              </Link>              
              <Link to="/credential">
              <SidebarMenuButton>
                Update Credentials
              </SidebarMenuButton>
              </Link>    
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            {data.map((item) => (
              <SidebarMenuButton key={item.chatId} onClick={() =>onChat(item.senderId,item.recipientId)}>
                <li>
                  {item.recipientId}
                </li>
              </SidebarMenuButton>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button type = 'submit' onClick={onLogout}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}