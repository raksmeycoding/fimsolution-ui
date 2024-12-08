import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {RespondDto} from "../types";
import d from "../constant/constant"
import {ScheduleAmountDueResDto} from "../types/schedule";

const useAmountDue = () => {
    return useQuery({
        queryKey: [d.key.schedule.GET_AMOUNT_DUE_FROM_DEFAULT_LOAN_URL],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<ScheduleAmountDueResDto>>(d.f2f.schedule.GET_AMOUNT_DUE_FROM_DEFAULT_LOAN_URL)
        },
        retry: 0,
        staleTime: Infinity,
        enabled: true,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
};

export default useAmountDue;