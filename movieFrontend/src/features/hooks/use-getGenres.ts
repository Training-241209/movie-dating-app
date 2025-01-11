import { QueryClient, useQuery,useQueryClient } from "@tanstack/react-query";
import { axiosInstanceExternal } from "@/lib/axios-Externalconfig";
import { useRouter } from "@tanstack/react-router";


export function useGetGenres() {
    return useQuery({
        queryKey: ['genre'],
        queryFn: async () => {
            const response = await axiosInstanceExternal.get("/3/genre/movie/list");
            const { genres } = response.data;
            return genres;
        },
    });
}

