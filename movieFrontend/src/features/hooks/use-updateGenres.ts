import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";


export function useUpdateGenres(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({genreId,movieId}:{genreId:number,movieId:number}) => {
            const resp = await axiosInstance.patch("", {genreId,movieId},
            )
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Movie and Genre Updated.");
            queryClient.invalidateQueries({
                queryKey: ["users"],
              });
        },
        onError: (e: any) => {
            toast.error(e.response?.data);
        },
    })
}