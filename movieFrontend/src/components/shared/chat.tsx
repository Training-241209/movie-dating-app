import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { messageSchema, MessageSchema } from "@/features/schemas/messageSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useStompClient } from "react-stomp-hooks";

export function ChatBoxContents({
  sender,
  recipient,
}: {
  sender: string;
  recipient: string;
}) {
  const [messages, setMessages] = useState<{ user: string; content: string }[]>(
    []
  );
  const [messagesFetched, setMessagesFetched] = useState(false); // Flag to check if messages are fetched
  const stompClient = useStompClient();
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messagesFetched) {
      console.log("FETCHING MESSAGES", messagesFetched);
      const fetchMessages = async () => {
        if (sender && recipient) {
          try {
            const response = await fetch(
              `http://localhost:8080/messages/${sender}/${recipient}`
            );
            const data = await response.json();

            setMessages(
              data.map((msg: { senderId: string; content: string }) => ({
                user: msg.senderId,
                content: msg.content,
              }))
            );

            setMessagesFetched(true);
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        }
      };
      fetchMessages();
    }
  }, [sender, recipient, messagesFetched]);

  // Listen for new messages after a match
  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/user/${sender}/queue/messages`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        setMessages((prev) => [
          ...prev,
          { user: recipient ?? "", content: parsedMessage.content },
        ]);
      });
    }
  }, [sender, stompClient]);

  // Form setup using react-hook-form and Zod validation
  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  // Send a message to the recipient
  function onSubmit(values: MessageSchema) {
    if (stompClient && sender && recipient) {
      const chatMessage = {
        senderId: sender,
        recipientId: recipient,
        content: values.message,
        timestamp: new Date(),
      };

      // Send message via WebSocket
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });

      // Update UI with the sent message
      setMessages((prev) => [
        ...prev,
        { user: sender ?? "", content: values.message },
      ]);
    }
    form.reset();
  }

  const isMessageEmpty = !form.watch("message")?.trim();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
<div
  ref={chatContainerRef}
  className="bg-gray-200 h-[500px] w-[1150px] mx-auto mt-4 border border-black rounded-md flex flex-col overflow-y-auto py-2"
>
  {messages?.length > 0 ? (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`p-2 flex ${msg.user === sender ? "justify-end" : "justify-start"}`}
      >
        {/* Container for name and message bubble */}
        <div className={`flex flex-col ${msg.user === sender ? "items-end" : "items-start px-1"}`}>
          {/* Name above the chat bubble */}
          <div
            className={`text-sm text-gray-500 mb-1 ${msg.user === sender ? "mr-2" : ""}`}
          >
            {msg.user === sender ? "You" : recipient}
          </div>

          {/* Chat bubble */}
          <div
            className={`px-[4px] py-2 rounded-lg max-w-[400px] ${
              msg.user === sender
                ? "bg-blue-500 text-white rounded-tl-lg rounded-br-lg "
                : "bg-gray-300 text-black rounded-tr-lg rounded-bl-lg"
            }`}
          >
            {msg.content}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="p-2 text-center text-gray-500">No messages yet</div>
  )}
</div>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between items-center w-[1150px] mx-auto mt-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[1050px] border border-black"
                    type="message"
                    placeholder="Message"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[90px]" disabled={isMessageEmpty}>
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </>
  );
}

// ChatBoxCard component to wrap chat content
export function ChatBoxCard({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-white shadow rounded">{children}</div>;
}

// ChatBoxCentering component to center chat box on the screen
export function ChatBoxCentering({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

// ChatBoxInnerContainer component for organizing the chat structure
export function ChatBoxInnerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col">{children}</div>;
}
