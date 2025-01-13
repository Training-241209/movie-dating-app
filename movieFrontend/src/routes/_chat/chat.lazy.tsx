import { createLazyFileRoute } from "@tanstack/react-router";
import { ChatBoxCard, ChatBoxCentering, ChatBoxContents } from "@/components/shared/chat";

export const Route = createLazyFileRoute("/_chat/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ChatBoxCentering>
      <ChatBoxCard>
        <ChatBoxContents />
      </ChatBoxCard>
    </ChatBoxCentering>
  );
}
