// hooks/useAllLoans.ts
import {useQuery} from "@tanstack/react-query";
import {LoanResDto, RespondDto} from "../types";
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
        retry: 0,
        staleTime: Infinity,
        enabled: true,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export default useAllLoans;
