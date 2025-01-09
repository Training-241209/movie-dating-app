import { ChatBoxCard, ChatBoxCentering, ChatBoxContents, ChatBoxInnerContainer, Message } from '@/components/shared/chat'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_chat/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <ChatBoxCentering>
      <ChatBoxCard>
        <ChatBoxContents>
          <ChatBoxInnerContainer>
            <Message user="me" message="hello world"/>
            <Message user="you" message="hello world"/>
          </ChatBoxInnerContainer>
        </ChatBoxContents>
      </ChatBoxCard>
    </ChatBoxCentering>

  )
}