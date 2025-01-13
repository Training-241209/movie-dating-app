import { createLazyFileRoute } from '@tanstack/react-router'
import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";
import { Message } from "@/components/shared/message";
<<<<<<< HEAD
=======
import { StompSessionProvider } from 'react-stomp-hooks';
import { useAuth } from '@/features/hooks/use-Auth';
>>>>>>> 7208d4bd1dcaebe4435c41ff0271c9de476cfb8b

export const Route = createLazyFileRoute('/_chat/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    
      <ChatBoxCentering>
        <ChatBoxCard>
          <ChatBoxContents>
            <Message user="me" message="Hello, how are you?" />
            <Message user="you" message="I'm good, thank you! How about you?" />
          </ChatBoxContents>
        </ChatBoxCard>
      </ChatBoxCentering>
  )
}
