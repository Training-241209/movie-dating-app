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
import { useAuth } from "@/features/hooks/use-Auth";
import { useState,useEffect } from "react";
import { useGetChatRooms } from "@/features/hooks/use-getChatRooms";
import { useLogout } from "@/features/hooks/use-logout";
import logo from "@/assets/cinematchLogo.png"

export function AppSidebar() {
  
  const queryClient = useQueryClient();
  const router = useRouter()
  const {mutate: logout} = useLogout();

  function onChat(senderId:string|undefined,recipientId:string){
    router.navigate({
      to: `/chat/${senderId}/${recipientId}`,
      params: { senderId, recipientId },
    });
  }
  const {data: auth} = useAuth()
  
  const {data:getChatRooms=[], isPending} = useGetChatRooms()

  useEffect(() => {
    console.log("getChatRooms ",getChatRooms)
  }, []);
  
  return (
    <Sidebar>
      <img src={logo} alt="Logo" className="w-[130px] "/>
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
              <SidebarMenuButton>
                {auth?.username}
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
          {!isPending ?(
            getChatRooms.length > 0 ? (
              getChatRooms.map((item:any) => (
                <SidebarMenuButton key={item.username} onClick={() => onChat(auth?.username, item.username)}>
                  <li>
                    {item.username}
                  </li>
                </SidebarMenuButton>
              ))
            ) : (
              "No ChatRoom Available")
          ) : "Loading"
          }
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button type = 'submit' onClick={() =>logout()}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
