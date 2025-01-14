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
            //Map messages here
            <Message user="me" message="Hello, how are you?" />
            <Message user="you" message="I'm good, thank you! How about you?" />
          </ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </div>
  )
}
