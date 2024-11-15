import {useQuery} from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance'; // assuming axiosInstance is pre-configured
import d from "../constant/constant"
import {RespondDto, ScheduleResDto} from "../types";

// Define the function to fetch all schedules
const fetchSchedulesRequest = async () => {
    const response = await axiosInstance.get<RespondDto<ScheduleResDto[]>>(d.apiUrl.schedule.GET_ALL_SCHEDULES);
    return response.data.data;
};

// Custom hook to fetch all schedules
const useAllSchedules = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: [d.key.schedule.ALL_SCHEDULES_KEY],
        queryFn: fetchSchedulesRequest,
        retry: 1,
        staleTime: Infinity,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });

    return {
        data, // The data containing all schedules
        isLoading, // A boolean indicating if the request is still loading
        error, // Any error encountered during the request
    };
};

export default useAllSchedules;
