import { createFileRoute } from '@tanstack/react-router'
import {
  ChatBoxCard,
  ChatBoxCentering,
  ChatBoxContents,
} from '@/components/shared/chat'
import { Message } from '@/components/shared/message'
import { useAuth } from '@/features/hooks/use-Auth'
import { useGetChats } from '@/features/hooks/use-getChats'
export const Route = createFileRoute('/_chat/chat/$senderId/$recipientId')({
  component: RouteComponent,
})

function RouteComponent() {
  //Call get messages from websocket
  const { senderId, recipientId } = Route.useParams()
  return (
    <div>
      <ChatBoxCentering>
        <ChatBoxCard>
          <ChatBoxContents
            sender={senderId}
            recipient={recipientId}
          ></ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </div>
  )
}
