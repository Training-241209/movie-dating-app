import React from "react";

import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";

import { messageSchema, MessageSchema } from "@/features/schemas/messageSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Message } from "@/components/shared/message";
import { useStompClient, useSubscription } from "react-stomp-hooks";


export function ChatBoxCentering({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex justify-center items-center">{children}</div>;
}

export function ChatBoxCard({ children }: { children: React.ReactNode }) {
  return <Card className="w-[1200px] h-[650px]">{children}</Card>;
}

export function ChatBoxContents({ children }: { children: React.ReactNode }) {
  const stompClient = useStompClient();
  //stompClient?.subscribe(`/user/${}/queue/messages`, (message) => {console.log(message)});
  
  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: MessageSchema) {
    if(stompClient){
      const chatMessage = {
        senderId: "alice",
        recipientId: "bob",
        content: values.message,
        timestamp: new Date(),
      }
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage)
      });
    }
    console.log(values);
    form.reset();
  }

  const isMessageEmpty = !form.watch("message")?.trim();

  return (
    <>
      <div className="bg-gray-200 h-[550px] w-[1150px] mx-auto mt-4 border border-black rounded-md flex flex-col-reverse overflow-y-auto">
        <ChatBoxInnerContainer>{children}</ChatBoxInnerContainer>
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

export function ChatBoxInnerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col">{children}</div>;
}
