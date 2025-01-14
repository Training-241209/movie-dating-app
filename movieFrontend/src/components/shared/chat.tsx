import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { messageSchema, MessageSchema } from "@/features/schemas/messageSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/features/hooks/use-Auth";
import { useStompClient } from "react-stomp-hooks";

export function ChatBoxContents() {
  const { data: auth } = useAuth();
  const [isMatched, setIsMatched] = useState(false);
  const [matchChecked, setMatchChecked] = useState(false);
  const [messages, setMessages] = useState<{ user: string; content: string }[]>([]);
  const [otherUserId, setOtherUserId] = useState<string | null>(null);
  const stompClient = useStompClient();
  const chatContainerRef = React.useRef<HTMLDivElement>(null); // Reference for the chat container

  // Check for a match when the component mounts
  useEffect(() => {
    const checkMatch = async () => {
      try {
        const otherUserMovieId = await getOtherUserMovieId();
        if (otherUserMovieId === auth?.favoriteMovie) {
          setIsMatched(true);
          setOtherUserId(await getOtherUserId());
          setMatchChecked(true);
        }
      } catch (error) {
        console.error("Error checking match:", error);
      }
    };

    checkMatch();
  }, [auth?.favoriteMovie]);

  useEffect(() => {
    if (isMatched && matchChecked) {
      const fetchMessages = async () => {
        if (auth?.username && otherUserId) {
          const response = await fetch(`http://localhost:8080/messages/${auth?.username}/${otherUserId}`);
          const data = await response.json();
          setMessages(data);
        }
      };
      fetchMessages();
    }
  }, [isMatched, matchChecked, auth?.username, otherUserId]);

  // Listen for new messages after a match
  useEffect(() => {
    if (isMatched && stompClient) {
      stompClient.subscribe(`/user/${auth?.username}/queue/messages`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { user: otherUserId ?? '', content: parsedMessage.content }]);
      });
    }
  }, [isMatched, auth?.username, stompClient]);

  // Fetch other user's movieId for matching logic
  async function getOtherUserMovieId() {
    try {
      const response = await fetch(`http://localhost:8080/api/match/${auth?.username}`);
      const data = await response.json();
      return data[0].favoriteMovie;
    } catch (error) {
      console.error("Error fetching other user's movieId:", error);
      return null;
    }
  }

  // Fetch other user's ID for chat history
  async function getOtherUserId() {
    try {
      const response = await fetch(`http://localhost:8080/api/match/${auth?.username}`);
      const data = await response.json();
      return data[0].username;
    } catch (error) {
      console.error("Error fetching other user's ID:", error);
      return null;
    }
  }

  // Form setup using react-hook-form and Zod validation
  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  // Send a message to the recipient
  function onSubmit(values: MessageSchema) {
    if (stompClient && isMatched && otherUserId) {
      const chatMessage = {
        senderId: auth?.username,
        recipientId: otherUserId,
        content: values.message,
        timestamp: new Date(),
      };

      // Send message via WebSocket
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });

      // Update UI with the sent message
      setMessages((prev) => [...prev, { user: auth?.username ?? '', content: values.message }]);
    }
    form.reset();
  }

  const isMessageEmpty = !form.watch("message")?.trim();

  // Scroll to the bottom of the chat container when messages change or on mount
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // If not matched, show a message
  if (!isMatched) {
    return <p>You need to be matched with someone to start chatting.</p>;
  }



  return (
    <>
      <div
        ref={chatContainerRef}
        className="bg-gray-200 h-[500px] w-[1150px] mx-auto mt-4 border border-black rounded-md flex flex-col overflow-y-auto py-2"
      >
        {messages?.length > 0 ? (
          messages.map((msg, index) => {
            return (
              <div key={index} className={`p-2 ${msg.user === auth?.username ? "text-right" : "text-left"}`}>
                <strong>{msg.user}: </strong>
                {msg.content}
              </div>
            );
          })
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
  return <div className="flex items-center justify-center min-h-screen">{children}</div>;
}

// ChatBoxInnerContainer component for organizing the chat structure
export function ChatBoxInnerContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
