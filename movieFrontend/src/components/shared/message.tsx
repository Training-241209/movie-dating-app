interface MessageProps {
  user: "me" | "you";
  message: string;
}

export function Message({ user, message }: MessageProps) {
  const isUser = user === "me";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2 px-4`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
