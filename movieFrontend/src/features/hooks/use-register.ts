import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schemas/registerSchema";
import { axiosInstance } from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";


export function useRegister(){

    const router = useRouter();

    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosInstance.post("/account/register", values);
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Registered successfuly.");
            router.navigate({ to: "/auth/login"});
        },
        onError: (e: any) => {
            toast.error(e.response?.data);
        },
    })
}