import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterSchema } from "../schemas/registerSchema";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";


export function useRegister(){

    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosInstance.post("/auth/register", values);
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Registered successfuly.");
            router.navigate({ to: "/auth/login"});
            queryClient.invalidateQueries({
                queryKey: ["users"],
              });
        },
        onError: (e: any) => {
            toast.error(e.response?.data);
        },
    })
}