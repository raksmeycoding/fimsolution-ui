import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {RespondDto} from "../types";
import d from "../constant/constant"
import {ScheduleAmountDueResDto} from "../types/schedule";

const usePastDue = () => {
    return useQuery({
        queryKey: [d.key.schedule.GET_PAST_DUE],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<ScheduleAmountDueResDto>>(d.apiUrl.schedule.GET_PAST_DUE)
        },
        retry: 1,
        staleTime: Infinity,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
};

export default usePastDue;