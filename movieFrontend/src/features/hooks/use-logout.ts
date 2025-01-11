import { axiosInstance } from "@/lib/axios-config";
import { useQueryClient,useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: async () => {
        const resp = await axiosInstance.post("/auth/logout");
        return resp.data;
        },
        onSuccess: () => {
        toast.success("Logged out successfuly.");
        localStorage.clear();
        queryClient.clear();
        router.navigate({ to: '/auth/login' })
        
        },
        onError: () => {
        toast.error( "Failed to log out");
        },
    });
    }