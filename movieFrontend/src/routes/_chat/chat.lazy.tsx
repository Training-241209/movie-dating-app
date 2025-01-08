import { ChatBoxCard, ChatBoxCentering, ChatBoxContents, ChatBoxInnerContainer } from '@/components/shared/chat'
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
            <div>Hello</div>
            <div>Hello2</div>
          </ChatBoxInnerContainer>
        </ChatBoxContents>
      </ChatBoxCard>
    </ChatBoxCentering>

  )
}