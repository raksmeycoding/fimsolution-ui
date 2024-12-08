import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant";
import axiosInstance from "../api/axiosInstance";
import {LoanResDto, RespondDto} from "../types";

interface UseDefaultLoanUserParams {
    loanId?: string; // Example of a parameter that might be passed
}

const useLoanDetailByLoanId = ({loanId}: UseDefaultLoanUserParams = {}) => {
    return useQuery({
        queryKey: [d.key.LOAN_DETAIL_KEY, loanId],
        queryFn: async () => {
            const response = await axiosInstance.get<RespondDto<LoanResDto>>(d.f2f.loan.GET_LOAN_DETAIL_BY_ID_URL + "/" + loanId);
            return response;
        },
        enabled: !!loanId,
        retry: 0,
        staleTime: Infinity, // Prevents automatic refetch due to staleness
        refetchOnMount: true, // Ensures refetching on component remount
        refetchOnWindowFocus: false, // Prevents refetching on window focus
        refetchOnReconnect: false, // Prevents refetching on network reconnect
    })
}

export default useLoanDetailByLoanId;



