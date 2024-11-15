// hooks/useUsers.ts
import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {RespondDto} from "../types";
import {User} from "../types/user/user";
import d from "../constant/constant";

// Custom hook to fetch all users
const useUsers = () => {
    return useQuery({
        queryKey: [d.key.user.USER_KEY],
        queryFn: async () => {
            const response = await axiosInstance.get<RespondDto<User[]>>(d.f2f.user.GET_ALL_USER_URL);
            return response.data;  // Assuming your API returns data in the "data" field
        },
        retry: 2, // Retry failed requests up to 2 times
        staleTime: Infinity, // The data never becomes stale
        enabled: true, // The query is always enabled
        refetchOnWindowFocus: false, // Do not refetch on window focus
        refetchOnMount: true, // Refetch the data every time the component mounts
        refetchOnReconnect: false // Do not refetch on reconnect
    });
};

export default useUsers;
