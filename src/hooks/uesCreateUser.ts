import {useMutation} from "@tanstack/react-query";
import {RequestDto, RespondDto} from "../types";
import axiosInstance from "../api/axiosInstance";
import d from "../constant/constant";
import queryClient from "../utils/clients/queryClient";
import {User} from "../types/user/user";

const useCreateUser = () => {
    return useMutation({
        mutationFn: async (requestBody: RequestDto<User>) => {
            return await axiosInstance.post<RespondDto<User>>(d.f2f.user.CREATE_LOAN_CURRENT_USER_URL, requestBody);
        },

        onSuccess: async (data) => {
            console.log("Create user successfully:", data.data.data);
            // Invalidate and refetch the queries that are related to the user
            await queryClient.invalidateQueries({queryKey: [d.key.user.USER_KEY]});
        },

        onError: (error: any) => {
            console.error("Create user error:", error);
            // Optionally handle error (e.g., show error message to user)
        },
    });
};

export default useCreateUser;
