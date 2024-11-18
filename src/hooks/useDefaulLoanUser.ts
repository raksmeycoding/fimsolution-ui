import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant";
import axiosInstance from "../api/axiosInstance";
import {LoanResDto, RespondDto} from "../types";

interface UseDefaultLoanUserParams {
    loanId?: string; // Example of a parameter that might be passed
}

const useDefaultLoanUser = ({loanId}: UseDefaultLoanUserParams = {}) => {
    return useQuery({
        queryKey: [d.key.DEFAULT_LOAN_CURRENT_USER_KEY],
        queryFn: async () => {
            return axiosInstance.get<RespondDto<LoanResDto>>(d.f2f.loan.DEFAULT_LOAN_CURRENT_USER_URL)
        },
        retry: 3,
        staleTime: 60000, // Prevents automatic refetch due to staleness
        refetchOnMount: true, // Ensures refetching on component remount
        refetchOnWindowFocus: false, // Prevents refetching on window focus
        refetchOnReconnect: false, // Prevents refetching on network reconnect
    })
}

export default useDefaultLoanUser;



