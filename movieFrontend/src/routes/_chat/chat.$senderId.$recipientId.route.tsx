import { createFileRoute, useRouter } from '@tanstack/react-router'
import {
  ChatBoxCard,
  ChatBoxCentering,
  ChatBoxContents,
} from '@/components/shared/chat'
import { useAuth } from '@/features/hooks/use-Auth'

export const Route = createFileRoute('/_chat/chat/$senderId/$recipientId')({
  component: RouteComponent,
})



function RouteComponent() {
  //Call get messages from websocket
  const router = useRouter()
  const { senderId, recipientId } = Route.useParams()
  const {data:auth} = useAuth()
  if(auth?.username !== senderId){
    router.navigate({to: '/chat'})
  }
  return (
    <div>
      <ChatBoxCentering isSidebarOpen={true}>
        <ChatBoxCard>
          <ChatBoxContents
            sender={senderId}
            recipient={recipientId}
            isSideBarOpen
          ></ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </div>
  )
}
