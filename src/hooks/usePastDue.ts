import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {RespondDto} from "../types";
import d from "../constant/constant"
import {ScheduleAmountDueResDto} from "../types/schedule";


export interface UsePastDueProps {
    loanId?: string,
}

const usePastDue = ({loanId}: UsePastDueProps = {}) => {
    return useQuery({
        queryKey: [d.key.schedule.GET_PAST_DUE, loanId],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<ScheduleAmountDueResDto>>(d.apiUrl.schedule.GET_PAST_DUE + `/${loanId}`)
        },
        enabled: !!loanId,
        retry: 0,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
};

export default usePastDue;