import { useQuery, } from "@tanstack/react-query";
import { axiosInstanceExternal } from "@/lib/axios-Externalconfig";
export function useGetGenres(){
    return (
        useQuery({
            queryKey: ['genre'],
            queryFn: async () => {
                const response = await axiosInstanceExternal.get("/3/genre/movie/list");
                console.log("RESPONSE", response.data)
                return response.data;
            }
        }) 
    )
}
