import { axiosInstance } from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ChatRoomUserSchema } from "../schemas/chatRoomUserSchema";

export function useGetChatRooms(senderId: string) : UseQueryResult<ChatRoomUserSchema[]> {
    return useQuery({
        queryKey: ['chatRooms'],
        queryFn: async () => {
            const resp = await axiosInstance.get(`/chatRoom/${senderId}`);
            return resp.data;
        }
    });
}