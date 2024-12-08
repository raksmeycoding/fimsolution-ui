import React, {useEffect, useState} from "react";
import {formatDateToMDY} from "../../utils/date";
import {useQuery} from "@tanstack/react-query";
import d from "../../constant/constant"
import axiosInstance from "../../api/axiosInstance";
import {LoanReqDto, LoanResDto, PaymentResDto, RespondDto} from "../../types";
import {formatDate} from "../../utils/helpers";
import usePastDue from "../../hooks/usePastDue";
import useLoanDetailByLoanId from "../../hooks/useLoanDetailByLoanId";
import useLoanLists from "../../hooks/useLoanLists";
import useQueryAmountDueBorrower from "../../hooks/useQueryAmountDueBorrower";
import useQueryAmountDueSourceLender from "../../hooks/useQueryAmountDueSourceLender";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


type SwitchState = {
    pastDueState: boolean;
    scheduleToReceive: boolean;
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 1 card at a time (can adjust based on your preference)
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 640, // for small screens
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768, // for medium screens
            settings: {
                slidesToShow: 2, // Show 2 cards at a time on medium screens
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1024, // for large screens
            settings: {
                slidesToShow: 2, // Show 3 cards at a time on large screens
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1280, // for large screens
            settings: {
                slidesToShow: 3, // Show 3 cards at a time on large screens
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1536, // for large screens
            settings: {
                slidesToShow: 4, // Show 3 cards at a time on large screens
                slidesToScroll: 1,
            },
        },
    ],
};


const TheLoan = () => {

    const {data: loanListData, isLoading: loanListIsLoading, isError: loanListIsError} = useLoanLists();
    useEffect(() => {
        if (loanListData?.data?.loanResDtoList?.length as number > 0) {
            setSelectedLoan(loanListData?.data?.loanResDtoList[0] as LoanResDto)
        }
    }, [loanListIsLoading, loanListIsError, loanListData]);


    const last4payments = useQuery({
        queryKey: [d.key.LAST_4_PAYMENTS_KEY],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<PaymentResDto[]>>(d.f2f.payment.LAST_4_PAYMENTS_URL)
        },
        retry: 0,
        staleTime: Infinity, // Prevents automatic refetch due to staleness
        refetchOnMount: false, // Ensures refetching on component remount
        refetchOnWindowFocus: false, // Prevents refetching on window focus
        refetchOnReconnect: false, // Prevents refetching on network reconnect

    })

    const [selectedLoan, setSelectedLoan] = useState<LoanReqDto | null>(null);


    const {
        data: defaultLoanUserData,
    } = useLoanDetailByLoanId({loanId: selectedLoan?.id});


    const handleSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const loanId = event.target.value;
        const selectedLoan = loanListData?.data?.loanResDtoList?.find((loan) => loan.id === loanId)
        setSelectedLoan(selectedLoan || null)
    }


    const filterOutIndexFirstLoan = loanListData?.data?.loanResDtoList


    const {
        data: amountDueSourceBorrowerData,
        isLoading: amoutDueSourceBorrowerIsLoading,
    } = useQueryAmountDueBorrower({loanId: selectedLoan?.id});


    useEffect(() => {

    }, [amountDueSourceBorrowerData, amoutDueSourceBorrowerIsLoading]);


    const {data: amountDueSourceLenderData} = useQueryAmountDueSourceLender({loanId: selectedLoan?.id});


    const {data: pastDueData} = usePastDue({loanId: selectedLoan?.id});



    return (
        <>
            {/* Where the clip path is */}
            <div
                className="  half-ellipse2 half-ellipse-my-loan font-satoshi flex flex-col gap-4 justify-center items-center text-center">
                <h1 className="container mx-auto font-bold text-3xl sm:text-4xl md:text-5xl">My Loans</h1>
            </div>

            {/*Loan List Sections*/}
            <h2 className="container mx-auto font-satoshi text-left font-bold text-[17px]  md:text-[21px] lg:text-[21px] mt-6 ">
                <select
                    onChange={handleSelectedChange}
                    className="outline-none bg-transparent py-1  hover:shadow-lg duration-200 font-normal  rounded-md  bg-[#f6feff] border min-w-[300px] ">
                    {
                        loanListIsLoading && (
                            <option className="text-[17px] ">Waiting...</option>
                        )
                    }

                    {


                        filterOutIndexFirstLoan?.map(loan => (
                            <option className="text-[17px]" key={loan.id}
                                    value={loan.id}>{loan?.nickName?.at(0)?.toUpperCase() + loan?.nickName?.slice(1)}</option>
                        ))

                    }
                </select>

                <div
                    className="slected-loan-state text-[17px] flex flex-col font-normal items-start justify-start mt-2">
                    <div className="mb-2">
                        <span
                            className="font-bold">Loan Number:
                        </span>
                        <span>{loanListIsLoading ? "Waiting..." : selectedLoan?.id}</span>
                    </div>

                    <div className="mb-2"><span className="font-bold">Status:</span> <span>Current</span></div>
                </div>

            </h2>

            {/* Note: This global config */}
            <div className="container mx-auto pt-4">

                <div className="cus-card-wrapper font-satoshi ">

                    <Slider {...settings}>
                        <div className="p-4">
                            <div
                                className="hover:scale-105 duration-300 shadow-[0px_7px_18px_2px_rgba(59,_130,_246,_0.5)] rounded-md px-5 py-6 h-[200px]  text-white font-normal leading-7 tracking-wider bg-gradient-to-l from-cyan-400 from-0% to-sky-600 to-100%">
                                <h4 className="text-[20px] font-bold">Please Pay</h4>
                                <div className="">$ {amountDueSourceBorrowerData?.data?.due ?? "0"}</div>
                                <div
                                    className="">In {formatDate(amountDueSourceBorrowerData?.data?.createdAt as string) ?? "Unknown"}</div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div
                                className="hover:scale-105 duration-300 shadow-[0px_7px_18px_2px_rgba(147,_51,_234,_0.5)] rounded-md px-5 py-6 h-[200px]  text-white font-normal leading-7 tracking-wider bg-gradient-to-l from-fuchsia-400 from-0% to-violet-600 to-100% ">
                                <h4 className="text-[20px] font-bold">You Are Received</h4>
                                <div>${amountDueSourceLenderData?.data?.due ?? "0"}</div>
                                <div>In {formatDate(amountDueSourceLenderData?.data?.createdAt as string) ?? "Unknown"}</div>

                            </div>
                        </div>
                        <div className="p-4">
                            <div
                                className="hover:scale-105 duration-300 shadow-[0px_7px_18px_2px_rgba(249,_115,_22,_0.5)] rounded-md px-5 py-6 h-[200px]  text-white font-normal leading-7 tracking-wider bg-gradient-to-l from-yellow-400 from-0% to-orange-600 to-100% ">
                                <h4 className="text-[20px] font-bold">Past Due</h4>
                                <div className="flex flex-row gap-2 ">
                                    <div className="drop-shadow-xl">Amount:</div>
                                    <span>{pastDueData?.data?.data?.due ?? "0"}</span>
                                </div>

                            </div>
                        </div>
                        <div className="p-4">
                            <div
                                className="hover:scale-105 duration-300 shadow-[0px_7px_18px_2px_rgba(236,_72,_153,_0.5)] rounded-md px-5 py-6 h-[200px]  text-white font-normal leading-7 tracking-wider bg-gradient-to-l from-pink-400 from-0% to-pink-600 to-100% ">
                                <h4 className="text-[20px] font-bold">Loan Details</h4>

                                <div className="flex flex-row gap-2 ">
                                    <div className="drop-shadow-xl">Loan Amount:</div>
                                    <span>{defaultLoanUserData?.data?.data?.amount ?? "0"}</span>
                                </div>
                                <div className="flex flex-row gap-2 ">
                                    <div className="drop-shadow-xl">Interest Rate:</div>
                                    <span>{defaultLoanUserData?.data?.data?.interest ?? "0"}</span>
                                </div>
                                <div className="flex flex-row gap-2 ">
                                    <div className="drop-shadow-xl">Contract Date:</div>
                                    <span>{formatDate(defaultLoanUserData?.data?.data?.createdDate as string) ?? "Unknown"}</span>
                                </div>
                                <div className="flex flex-row gap-2 ">
                                    <div className="drop-shadow-xl">End Date:</div>
                                    <span>{formatDate(defaultLoanUserData?.data?.data?.endDate as string) ?? "Unknown"}</span>
                                </div>

                            </div>
                        </div>

                    </Slider>


                </div>


                {/* Payment Histor */}
                <div className="payment-history font-satoshi font-bold text-2xl w-full mt-8">
                    Payment History
                </div>

                {/* table of payment history timeline */}
                <div className="table-data-history font-satoshi  text-xl w-full mt-4 overflow-x-scroll">
                    <table className="table-auto w-full">
                        <thead className="text-center  font-bold text-base sm:text-lg h-8 sm:h-9 md:h-10 lg:h-12">
                        <tr>
                            <th className="border px-2">Date Paid</th>
                            <th className="border px-2">Schedule Date</th>
                            <th className="border px-2">Description</th>

                            <th className="border px-2">Paid</th>
                            <th className="border px-2">Due</th>
                            <th className="border px-2">Status</th>
                        </tr>
                        </thead>
                        <tbody className="text-base whitespace-nowrap">

                        {last4payments.isLoading && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center"
                                >
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {last4payments.isError && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center"
                                >
                                    Error loading payments
                                </td>
                            </tr>
                        )}
                        {last4payments?.data?.data?.data?.map((payment) => (
                            <tr
                                key={payment.id}
                                className="text-center h-fit"
                            >
                                <td className="border px-2">
                                    {formatDateToMDY(payment.paymentDate as string)}
                                </td>
                                <td className="border px-2">
                                    {formatDateToMDY(
                                        payment.scheduleResDto?.createAt as string
                                    )}
                                </td>
                                <td className="border px-2">{payment.type}</td>
                                {/* <td className="border px-2">{payment.interest}</td> */}
                                <td className="border px-2">{payment.amount}</td>
                                <td className="border px-2">
                                    {payment.scheduleResDto?.due}
                                </td>
                                <td className="border px-2">{payment.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default TheLoan;