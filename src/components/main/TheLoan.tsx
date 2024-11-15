import React, {useEffect} from "react";
import BgNavWavBackground from "../../images/nav-wav-background.svg";
import PlayerSVG from "../../images/play.svg";
import questionSvg from "../../images/question-mark-svgrepo-com.svg";
import questionWhiteSvg from "../../images/question-mark-svgrepo-com-white.svg";
// import {useCurrentUserLoanQuery} from "../../../redux/app/services/loanApi";
// import {useLoginMutation} from "../../../redux/app/services/authApi";
// import {RespondDto, LoanResDto} from "../../../types/index";
import {formatDateToCustomString, formatDateToMDY} from "../../utils/date";
import {useQuery} from "@tanstack/react-query";
import d from "../../constant/constant"
import axiosInstance from "../../api/axiosInstance";
import {LoanResDto, PaymentResDto, RespondDto} from "../../types";
// import {useLast4PaymentsQuery} from "../../../redux/app/services/paymentApi";


const TheLoan = () => {

    const cLoanQuery = useQuery({
        queryKey: [d.key.DEFAULT_LOAN_CURRENT_USER_KEY],
        queryFn: async () => {
            return axiosInstance.get<RespondDto<LoanResDto>>(d.f2f.loan.DEFAULT_LOAN_CURRENT_USER_URL)
        },
        retry: 3,
        staleTime: 60000, // Prevents automatic refetch due to staleness
        refetchOnMount: true, // Ensures refetching on component remount
        refetchOnWindowFocus: false, // Prevents refetching on window focus
        refetchOnReconnect: false, // Prevents refetching on network reconnect



    })



    const last4payments = useQuery({
        queryKey: [d.key.LAST_4_PAYMENTS_KEY],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<PaymentResDto[]>>(d.f2f.payment.LAST_4_PAYMENTS_URL)
        },
        retry: 3,
        staleTime: 60000, // Prevents automatic refetch due to staleness
        refetchOnMount: true, // Ensures refetching on component remount
        refetchOnWindowFocus: false, // Prevents refetching on window focus
        refetchOnReconnect: false, // Prevents refetching on network reconnect

    })


    return (
        <>
            {/* Where the clip path is */}
            <div
                className="half-ellipse2 half-ellipse font-satoshi flex flex-col gap-4 justify-center items-center text-center">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">My Loans</h1>
            </div>

            <h2 className="font-satoshi text-center font-bold text-xl md:text-2xl lg:text-3xl mt-12">
                Loan from Paola and Esteban Leyva
            </h2>

            {/* Note: This global config */}
            <div className="global_config w-12/12 mx-auto px-2 sm:w-10/12 md:w-9/12 lg:8/12">
                {/* Section table*/}
                <div className="due_amount_and_pass_due w-full my-8 ">
                    <div
                        className="table-loan-wrapper font-satoshi flex flex-col md:flex-row gap-4 justify-between w-full ">
                        {/* left section */}
                        <div
                            className="head-right p-1 sm:p-2 flex flex-col items-start justify-between gap-3 self-start grow h-[300px] md:p-4 w-full  rounded-md  my-shadow">
                            <div
                                className="section-top-one-of-amount  w-full flex flex-row justify-between items-start ">
                                {/* section Amount Due */}
                                <div className="section-amount w-full flex flex-col gap-0 sm:gap-1">
                                    {/* amount */}
                                    <div className="section-amount flex flex-row gap-1 sm:gap-3 items-center w-full">
                                        <p className="font-medium whitespace-nowrap text-md  md:text-xl lg:text-2xl">
                                            Amount Due
                                        </p>
                                        <p className="h-4 w-4 bg-[#eef9f9] rounded-full flex items-center justify-center">
                                            <img
                                                className="h-3"
                                                src={questionSvg}
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                    {/* amount of money */}
                                    <div className="amount-of-money font-medium text-md lg:text-xl">
                                        $ <span>{cLoanQuery.data?.data?.data?.amount}</span>
                                    </div>
                                    {/* date of amount */}
                                    <div className="date-of-amount font-medium whitespace-nowrap text-md lg:text-xl">
                                        {formatDateToCustomString(
                                            cLoanQuery.data?.data?.data?.createdDate as string
                                        )}
                                    </div>
                                </div>

                                {/* Section pass due */}
                                <div className=" flex flex-row gap-1 sm:gap-3 items-center">
                                    <p className="font-medium whitespace-nowrap text-red-500 text-md md:text-xl lg:text-2xl">
                                        Pass Due
                                    </p>
                                    <p className="h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <img
                                            className="h-3"
                                            src={questionWhiteSvg}
                                            alt=""
                                        />
                                    </p>
                                </div>
                            </div>

                            {/* Button maker payment */}
                            <button
                                className="button-maker-payment text-center font-normal md:font-medium text-md md:text-xl lg:text-2xl w-full rounded-md border py-2 lg:py-4">
                                Make a payment
                            </button>
                            {/* button section */}
                            <div className="button-section w-full flex flex-col gap-0 sm:gap-2">
                                <div
                                    className="remaining-of-balance flex flex-col lg:flex-row justify-between items-center ">
                                    <div className="left font-bold text-lg whitespace-nowrap">
                                        Balance Remaining:
                                    </div>
                                    <div className="right whitespace-nowrap font-medium">
                                        $7,603.97 as of 10/1/2024
                                    </div>
                                </div>
                                <div
                                    className="payoff-of-balance flex flex-col lg:flex-row justify-between items-center ">
                                    <div className="left font-bold whitespace-nowrap text-lg">
                                        Payoff Amount:
                                    </div>
                                    <div className="right whitespace-nowrap font-medium">
                                        $7,603.97 as of 10/15/2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="head-right p-1 sm:p-2 flex flex-col items-start justify-between gap-3 self-start grow w-full h-[300px] md:p-4  rounded-md  my-shadow">
                            <div className="section-top-one-of-amount  w-full flex flex-col items-start">
                                {/* section loan detail */}
                                <div className="section-1 w-full ">
                                    <div
                                        className=" font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                        Loan Details
                                    </div>
                                    <div className="sup-loan-detail flex flex-row">
                                        <div className="right w-[50px]"></div>
                                        <div className="left w-full">
                                            <div className="loannumber flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Loan Amount
                                                </p>
                                                <p>${cLoanQuery.data?.data?.data?.amount}</p>
                                            </div>
                                            <div className="loan-amount flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Contract date
                                                </p>
                                                <p>
                                                    {formatDateToMDY(
                                                        cLoanQuery.data?.data?.data?.createdDate as string
                                                    )}
                                                </p>
                                            </div>
                                            <div className="start-date flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Interest
                                                </p>
                                                <p>
                                                    {cLoanQuery.data?.data?.data?.interest}
                                                    <span>%</span>
                                                </p>
                                            </div>
                                            <div
                                                className="payoff-of-balance flex flex-row justify-between items-center ">
                                                <div className="  whitespace-nowrap font-medium mr-2">
                                                    End date:
                                                </div>
                                                <div className=" whitespace-nowrap ">
                                                    {formatDateToCustomString(
                                                        cLoanQuery.data?.data?.data?.endDate as string
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 */}
                                {/* Payment timeline section */}
                                <div className="section-1 w-full ">
                                    <div
                                        className="font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                        Payment Timelines
                                    </div>
                                    <div className="sup-loan-detail flex flex-row">
                                        <div className="right w-[50px]"></div>
                                        <div className="left w-full">
                                            <div className="loannumber flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    On Time Payments
                                                </p>
                                                <p>3</p>
                                            </div>
                                            <div className="loan-amount flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Early Payments
                                                </p>
                                                <p>0</p>
                                            </div>
                                            <div className="start-date flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Late Payments
                                                </p>
                                                <p>0</p>
                                            </div>
                                            <div
                                                className="payoff-of-balance flex flex-row justify-between items-center ">
                                                <div className="  whitespace-nowrap font-medium mr-2">
                                                    Pass Due Payments
                                                </div>
                                                <p className=" whitespace-nowrap ">0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ☝️ End of wrapper  */}

                    {/* section 2 - make payment */}
                    {/* <div className="section2-make-payment w-full flex flex-row justify-between">
              <button className="px-14 py-4 font-bold  rounded-sm border bg-[#f6f7f8] ">
                Make Payment
              </button>
              <div className="payment-timeine text-3xl font-bold text-start  md:w-[400px]">
                <p>Payment Timeliness:</p>
              </div>
            </div> */}

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
                            {/* <tr className="text-center h-fit">
                  <td className="border px-2">10/01/2024</td>
                  <td className="border px-2">10/01/2024</td>
                  <td className="border px-2">Payment</td>
                  <td className="border px-2">On time</td>
                  <td className="border px-2">$50.69</td>
                  <td className="border px-2">$200.00</td>
                  <td className="border px-2">$250.69</td>
                  <td className="border px-2">$7,603.97</td>
                </tr> */}

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
            </div>
        </>
    );
};

export default TheLoan;