import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant"
import axiosInstance from "../api/axiosInstance";
import {RespondDto} from "../types";
import {ScheduleAmountDueResDto} from "../types/schedule";

const UseScheduleToReceive = () => {
    return useQuery({
        queryKey: [d.key.schedule.GET_BORROWER_YOU_ARE_SCHEDULE_BOTH_BORROWER_AND_LENDER],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<ScheduleAmountDueResDto>>(d.f2f.schedule.GET_BORROWER_YOU_ARE_SCHEDULE_BOTH_BORROWER_AND_LENDER)
        },
        retry: 0,
        staleTime: Infinity,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
    })
};

export default UseScheduleToReceive;