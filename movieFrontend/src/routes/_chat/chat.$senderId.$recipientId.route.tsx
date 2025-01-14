import { createFileRoute } from '@tanstack/react-router'
import {
  ChatBoxCard,
  ChatBoxCentering,
  ChatBoxContents,
} from '@/components/shared/chat'
import { Message } from '@/components/shared/message'
import { useAuth } from '@/features/hooks/use-Auth'
export const Route = createFileRoute('/_chat/chat/$senderId/$recipientId')({
  component: RouteComponent,
})

function RouteComponent() {
  //Call get messages from websocket
  const { senderId, recipientId } = Route.useParams()
  const {data:auth } = useAuth()
  return (

    <div>
      {senderId}
      {recipientId}
      {auth?.username}
      <ChatBoxCentering>
        <ChatBoxCard>
          <ChatBoxContents>
          </ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </div>
  )
}
