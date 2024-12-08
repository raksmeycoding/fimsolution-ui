import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant"
import axiosInstance from "../api/axiosInstance";
import {LoanListResponseDto, LoanResDto, RespondDto} from "../types";


const useLoanLists = () => {
    return useQuery({
        queryKey: [d.key.loan.KEY_LOAN_LIST],
        queryFn: async () => {
            const loanLists = await axiosInstance.get<RespondDto<LoanListResponseDto>>(d.f2f.loan.GET_ALL_LOAN_LISTS_URL);
            return loanLists.data;
        },
        retry: 0,
        staleTime: Infinity,
        enabled: true,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
};

export default useLoanLists;