import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {LoanResDto, RespondDto} from "../types";
import {ScheduleAmountDueResDto} from "../types/schedule";
import d from "../constant/constant";


export interface UseQueryAmountDueBorrowerProps {
    loanId?: string;
}

const useQueryAmountDueBorrower = ({loanId}: UseQueryAmountDueBorrowerProps = {}) => {
    return useQuery({
        queryKey: [d.key.schedule.GET_AMOUNT_DUE_HAS_SOURCE_BORROWER_URL_KEY, loanId],
        queryFn: async () => {
            const res = await axiosInstance.get<RespondDto<ScheduleAmountDueResDto>>(d.f2f.schedule.GET_AMOUNT_DUE_HAS_SOURCE_BORROWER_URL + `/${loanId}/amount-due/borrower`);
            return res.data;
        },
        enabled: !!loanId,
        staleTime: Infinity,
        retry: 0,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
};

export default useQueryAmountDueBorrower;