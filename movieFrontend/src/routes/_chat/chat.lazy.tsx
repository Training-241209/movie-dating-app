import { createLazyFileRoute } from '@tanstack/react-router'
import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";
import { Message } from "@/components/shared/message";
import { useAuth } from '@/features/hooks/use-auth';

export const Route = createLazyFileRoute('/_chat/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth} = useAuth();
      console.log("chat", auth);
  return(
    <ChatBoxCentering >
      <ChatBoxCard >
        <ChatBoxContents>
          <Message user="me" message="Hello, how are you?" />
          <Message user="you" message="I'm good, thank you! How about you?" />
        </ChatBoxContents>
      </ChatBoxCard>
    </ChatBoxCentering>
  )
}
