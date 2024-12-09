import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant"
import axiosInstance from "../api/axiosInstance";
import {PaymentResDto, RespondDto} from "../types";

export const useAllPayments = () => {
    return useQuery({
        queryKey: [d.key.payment.ALL_PAYMENTS_KEY],
        queryFn: async () => {
            const response = await axiosInstance.get<RespondDto<PaymentResDto[]>>(d.apiUrl.payment.ALL_PAYMENTS)
            const responseWithData = response?.data;
            return responseWithData;
        },
        retry: 0,
        staleTime: Infinity,
        enabled: true,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}