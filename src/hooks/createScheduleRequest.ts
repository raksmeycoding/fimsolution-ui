import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import {RespondDto, ScheduleReqDto, ScheduleResDto} from "../types"; // assuming axiosInstance is pre-configured
import d from "../constant/constant"
import queryClient from "../utils/clients/queryClient";

// Define the function for creating a schedule
const createScheduleRequest = async (scheduleData: ScheduleReqDto) => {
    const response = await axiosInstance.post<RespondDto<ScheduleResDto>>(d.apiUrl.schedule.POST_A_SINGLE_SCHEDULE, scheduleData);
    return response.data;
};

// Custom hook to create a schedule
const useCreateSchedule = () => {
    const {mutate, isPending} = useMutation({
        mutationFn: createScheduleRequest,

        onSuccess: async (data) => {
            return await queryClient.invalidateQueries({queryKey: [d.key.schedule.ALL_SCHEDULES_KEY]})
        },
        onError: async (error: any) => {
            console.log(error);
        }
    });

    return {
        mutate, // The mutate function that we call in our component
        isPending, // A boolean indicating if the request is still pending
    };
};

export default useCreateSchedule;
