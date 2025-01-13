import { createLazyFileRoute } from '@tanstack/react-router'
import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";
import { Message } from "@/components/shared/message";
import { StompSessionProvider } from 'react-stomp-hooks';

export const Route = createLazyFileRoute('/_chat/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <StompSessionProvider
      url="ws://localhost:8080/websocket"
      onConnect={() => {
        console.log('Connected');
      }}
      onDisconnect={() => {
        console.log('Disconnected');
      }}
      >
      <ChatBoxCentering>
        <ChatBoxCard>
          <ChatBoxContents>
            <Message user="me" message="Hello, how are you?" />
            <Message user="you" message="I'm good, thank you! How about you?" />
          </ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
    </StompSessionProvider>
  )
}
