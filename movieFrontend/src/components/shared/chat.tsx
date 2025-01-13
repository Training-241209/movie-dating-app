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
  const [messages, setMessages] = useState<{ user: string; content: string }[]>([]);
  const [otherUserId, setOtherUserId] = useState<string | null>(null);
  const stompClient = useStompClient();

  // Check for a match when the component mounts
  useEffect(() => {
    const checkMatch = async () => {
      try {
        const otherUserMovieId = await getOtherUserMovieId();
        if (otherUserMovieId === auth?.favoriteMovie) {
          setIsMatched(true);
          setOtherUserId(await getOtherUserId());
        }
      } catch (error) {
        console.error("Error checking match:", error);
      }
    };

    checkMatch();
  }, [auth?.favoriteMovie]);

  // Fetch previous chat history when matched
  useEffect(() => {
    const fetchMessages = async () => {
      if (auth?.username && otherUserId) {
        const response = await fetch(`http://localhost:8080/messages/${auth?.username}/${otherUserId}`);
        const data = await response.json();
        console.log("messages", data);
        console.log("messages", data);
        setMessages(data); // Assuming the API returns an array of messages
      }
    };

    if (isMatched) {
      fetchMessages();
    }
  }, [isMatched, auth?.username, otherUserId]);

  // Listen for new messages after a match
  useEffect(() => {
    if (isMatched && stompClient) {
      stompClient.subscribe(`/user/${auth?.username}/queue/messages`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { user: "you", content: parsedMessage.content }]);
      });
    }
  }, [isMatched, auth?.username, stompClient]);

  // Fetch other user's movieId for matching logic
  async function getOtherUserMovieId() {
    try {
      const response = await fetch(`http://localhost:8080/api/match/${auth?.username}`);
      const data = await response.json();
      console.log("movie", data);
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
      console.log("userId", data.accountId);
      return data[0].username; // Assuming the backend returns the user ID
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
      setMessages((prev) => [...prev, { user: "me", content: values.message }]);
    }
    form.reset();
  }

  const isMessageEmpty = !form.watch("message")?.trim();

  // If not matched, show a message
  if (!isMatched) {
    return <p>You need to be matched with someone to start chatting.</p>;
  }

  return (
    <>
      <div className="bg-gray-200 h-[550px] w-[1150px] mx-auto mt-4 border border-black rounded-md flex flex-col-reverse overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.user === "me" ? "text-right" : "text-left"}`}>
            <strong>{msg.user}: </strong>
            {msg.content}
          </div>
        ))}
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
