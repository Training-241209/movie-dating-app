import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { useAuth } from "./use-Auth";


export function useSelectGenres(){
    const {data: auth} = useAuth()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({genreId,movieId}:{genreId:number,movieId:number}) => {
           
            console.log(genreId,movieId)
            console.log(import.meta.env.VITE_API_URL+"/account/choose-favorites")
            const resp = await axiosInstance.post("/account/choose-favorites", {genreId,movieId},
            //     {headers:{
            //     Authorization: 'Bearer ' + auth
            // }}
            )
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Movie and Genre Selected.");
            queryClient.invalidateQueries({
                queryKey: ["users"],
              });
        },
        onError: (e: any) => {
            toast.error(e.response?.data);
        },
    })
}