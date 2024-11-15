import {useMutation} from "@tanstack/react-query";
import d from "../constant/constant"
import {PaymentReqDto, PaymentResDto} from '../types';
import axiosInstance from "../api/axiosInstance";
import queryClient from "../utils/clients/queryClient";

const useCreatePayment = () => {
    return useMutation({
        mutationFn: async (request: PaymentReqDto) => {
            return await axiosInstance.post<PaymentResDto>(d.apiUrl.payment.POST_A_SINGLE_PAYMENT, request);
        },
        onSuccess: async (data) => {
            return queryClient.invalidateQueries({queryKey: [d.key.payment.ALL_PAYMENTS_KEY]})
        },
        onError: async (error: any) => {
            console.log("Error uploading payment:", error)
        }
    })
};

export default useCreatePayment;
