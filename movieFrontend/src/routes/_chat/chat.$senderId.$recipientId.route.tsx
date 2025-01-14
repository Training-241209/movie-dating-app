import { createFileRoute } from '@tanstack/react-router'
import {
  ChatBoxCard,
  ChatBoxCentering,
  ChatBoxContents,
} from '@/components/shared/chat'
import { Message } from '@/components/shared/message'
export const Route = createFileRoute('/_chat/chat/$senderId/$recipientId')({
  component: RouteComponent,
})

function RouteComponent() {
  //Call get messages from websocket
  return (
    <div>
      <ChatBoxCentering>
        <ChatBoxCard>
          <ChatBoxContents>
          </ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </div>
  )
}
