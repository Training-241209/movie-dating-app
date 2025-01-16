import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

export function useGetChats({ sender, recipient }: { sender: string; recipient: string }) {
  return useQuery({
    queryKey: ['chats', sender, recipient],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/messages/${sender}/${recipient}`);
        return response.data;
      } catch (error) {
        return [];
      }
    },
      refetchInterval: 1000,
  });
}