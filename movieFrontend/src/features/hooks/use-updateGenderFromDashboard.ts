import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

interface GenderPreferenceDTO {
  gender: string;
  genderPreference: string;
}

export function useUpdateGenderFromDashboard() {
    const router = useRouter()
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, GenderPreferenceDTO>({
    mutationFn: async (data: GenderPreferenceDTO) => {
      
      const response = await axiosInstance.patch("account/update-gender-and-preference", data, {
        
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the "auth" query to trigger a refetch and update the auth data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Gender and preference updated successfully!");
        router.navigate({to : '/dashboard'})
      
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || "An error occurred while updating.");
    },
  });
}
