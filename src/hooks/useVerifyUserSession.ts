import { useQuery } from "@tanstack/react-query";
import d from "../constant/constant";
import axiosInstance from "../api/axiosInstance";
import { RespondDto } from "../types";
import { SessionDto } from "../types/session";

const useVerifyUserSession = () => {
    return useQuery<SessionDto, Error>({
        queryKey: [d.key.session.VERIFY_ROLE_key],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<RespondDto<SessionDto>>(d.f2f.session.VERIFY_ROLE);
                // Check for valid response structure
                if (!response?.data?.data) {
                    throw new Error('Invalid response structure');
                }
                return response.data.data;
            } catch (error) {
                console.error("Error during session verification:", error);
                throw error; // Make sure to throw the error so React Query knows it failed
            }
        },
        enabled: true,
        staleTime: Infinity,
        retry: (failureCount, error) => {
            console.log(`Retrying... attempt ${failureCount + 1}`);
            return failureCount < 3; // Retry up to 3 times on failure
        },
        retryDelay: (attemptIndex) => {
            console.log(`Retry delay for attempt ${attemptIndex}`);
            if (attemptIndex === 0) {
                return 0; // No retry delay for the first attempt
            }
            return 2000; // Retry after 2 seconds on failure
        },
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export default useVerifyUserSession;
