// hooks/useCreateLoan.ts
import {useMutation} from "@tanstack/react-query";
import {LoanReqDto, RequestDto, RespondDto} from "../types";
import axiosInstance from "../api/axiosInstance";
import queryClient from "../utils/clients/queryClient";
import d from "../constant/constant";

// Custom hook to create a loan
const useCreateLoan = () => {
    return useMutation({
        mutationFn: async (requestBody: RequestDto<LoanReqDto>) => {
            return await axiosInstance.post<RespondDto<LoanReqDto>>(d.apiUrl.loan.POST_A_SINGLE_LOAN, requestBody);
        },
        onSuccess: async (data) => {
            console.log("Create loan successfully:", data.data.data);
            // Invalidate the query that fetches all loans to refresh the list
            await queryClient.invalidateQueries({ queryKey: [d.key.loan.ALL_LOAN_KEY] });
        },
        onError: (error) => {
            console.log("Create loan error:", error);
        }
    });
};

export default useCreateLoan;
