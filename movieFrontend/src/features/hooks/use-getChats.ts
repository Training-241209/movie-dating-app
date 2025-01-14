import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ChatSchema } from "../schemas/chatSchema";
import { axiosInstance } from "@/lib/axios-config";

export function useGetChats(senderId: string, recipientId: string) : UseQueryResult<ChatSchema[]>  {
    return useQuery({
        queryKey: ['chats', senderId, recipientId],
        queryFn: async () => {
            const resp = await axiosInstance.get(`/messages/${senderId}/${recipientId}`); 
            return resp.data;
        }
    })
}