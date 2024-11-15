import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant"
import axiosInstance from "../api/axiosInstance";
import {PaymentResDto, RespondDto} from "../types";

export const useAllPayments = () => {
    return useQuery({
        queryKey: [d.key.payment.ALL_PAYMENTS_KEY],
        queryFn: async () => {
            const response = await axiosInstance.get<RespondDto<PaymentResDto[]>>(d.apiUrl.payment.ALL_PAYMENTS)
            console.log("Respond fetching data:", response)
            const responseWithData = response?.data;
            console.log("Response with data:", responseWithData);
            return responseWithData;
        },
        retry: 1,
        staleTime: Infinity,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })
}