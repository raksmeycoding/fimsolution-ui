import {useQuery} from "@tanstack/react-query";
import d from "../constant/constant";
import axiosInstance from "../api/axiosInstance";
import {LoanResDto, RespondDto} from "../types";

const useVerifyDefaultLoanExist = () => {
    return useQuery({
        queryKey: [d.key.loan.HAVE_DEFAULT_LOAN],
        queryFn: async () => {
            const respond = await axiosInstance.get<RespondDto<LoanResDto>>(d.apiUrl.loan.GET_VERIFY_HAVE_DEFAULT_LOAN);
            return respond.data;

        },
        retry: 0,
        staleTime: Infinity,
        enabled: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,

    })
};

export default useVerifyDefaultLoanExist;