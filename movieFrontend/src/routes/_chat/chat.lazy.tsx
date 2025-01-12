import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";
import { Message } from "@/components/shared/message";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_chat/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ChatBoxCentering>
      <ChatBoxCard>
        <ChatBoxContents>
          <Message user="me" message="Hello, how are you?" />
          <Message user="you" message="I'm good, thank you! How about you?" />
        </ChatBoxContents>
      </ChatBoxCard>
    </ChatBoxCentering>
  );
}