// hooks/useAllLoans.ts
import {useQuery} from "@tanstack/react-query";
import {LoanReqDto, LoanResDto, RespondDto} from "../types";
import axiosInstance from "../api/axiosInstance";
import d from "../constant/constant";

// Custom hook to fetch all loans
const useAllLoans = () => {
    return useQuery({
        queryKey: [d.key.loan.ALL_LOAN_KEY],
        queryFn: async () => {
            const response = await axiosInstance.get<RespondDto<LoanResDto[]>>(d.apiUrl.loan.GET_ALL_LOAN);
            return response.data; // Assuming your API response structure has the 'data' field
        },
        retry: 2, // Retry on failure up to 2 times
        staleTime: Infinity, // Data never becomes stale
        enabled: true, // Always enabled
        refetchOnWindowFocus: false, // Do not refetch on window focus
        refetchOnMount: true, // Refetch data on component mount
        refetchOnReconnect: false // Do not refetch on reconnect
    });
};

export default useAllLoans;
