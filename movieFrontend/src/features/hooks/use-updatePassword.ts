import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useUpdatePassword(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(password:string) =>{
            const token = "Bearer " + queryClient.getQueryData<{ token: string }>(["auth"])?.token;
            console.log(token)
            const resp = await axiosInstance.patch("", {password},
                {
                    headers: {
                        Authorization: token,
                      },
                }
            )
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Password Updated.");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (e: any) => {
            toast.error(e.response?.data);
        },
    })
}