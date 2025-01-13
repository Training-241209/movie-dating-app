import { createLazyFileRoute } from '@tanstack/react-router'
import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";
import { Message } from "@/components/shared/message";
<<<<<<< HEAD
import { StompSessionProvider } from 'react-stomp-hooks';
=======
import { useAuth } from '@/features/hooks/use-Auth';
>>>>>>> 0343e551d72fe556545cf7875751109e58781208

export const Route = createLazyFileRoute('/_chat/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth} = useAuth();
      console.log("chat", auth);
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
