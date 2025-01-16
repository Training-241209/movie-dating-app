import { useQuery, } from "@tanstack/react-query";
import { axiosInstanceExternal } from "@/lib/axios-Externalconfig";
import { useRouter } from "@tanstack/react-router";
export function useGetMovies({genreId}:{genreId:number}){
    return (
        useQuery({
            queryKey: ['movie'],
            queryFn: async () => {
                const response = await axiosInstanceExternal.get(`/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&with_original_language=en`);
                return response.data.results;
            }
        }) 
    )
}