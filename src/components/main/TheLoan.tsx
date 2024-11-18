import React, {useCallback, useEffect, useState} from "react";
import {formatDateToCustomString, formatDateToMDY} from "../../utils/date";
import {useQuery} from "@tanstack/react-query";
import d from "../../constant/constant"
import axiosInstance from "../../api/axiosInstance";
import {PaymentResDto, RespondDto} from "../../types";
import useAmountDue from "../../hooks/useAmountDue";
import useScheduleToReceive from "../../hooks/useScheduleToReceive";
import {formatDate} from "../../utils/helpers";
import usePastDue from "../../hooks/usePastDue";
import {GrCaretNext} from "react-icons/gr";
import useDefaulLoanUser from "../../hooks/useDefaulLoanUser";


type SwitchState = {
    pastDueState: boolean;
    scheduleToReceive: boolean;
}


const switchStateInit: SwitchState = {pastDueState: false, scheduleToReceive: true};

const TheLoan = () => {

    const [switchState, setSwitchState] = useState<SwitchState>(switchStateInit);

    const handleSwitchState = useCallback(() => {
        setSwitchState((prevState) => ({
            pastDueState: !prevState.pastDueState,
            scheduleToReceive: !prevState.scheduleToReceive,
        }));
    }, []);

    const {
        data: amountDueData,
        // isLoading: isAmoutDueLoanding,
        // isError: isAmoutError,
        error: amoutDueError
    } = useAmountDue();

    const {
        data: passDueData,
        // isLoading: isPassDueLoanding,
        // isError: isPassError,
        error: passDueError
    } = usePastDue();

    const {
        data: scheduleToReceiveData,
        isLoading: isScheduleToRecevieLoaing,
        isError: isScheduleToReceiveError,
        error: scheduleToReceiveError,
    } = useScheduleToReceive()


    useEffect(() => {
        console.log("Amount Due Data: ", amountDueData);
        console.log("Amount Due Error: ", amoutDueError);
    }, [amountDueData, amoutDueError]);


    useEffect(() => {
        console.log("scheduleToReceiveData", scheduleToReceiveData);
        console.log("scheduleToReceiveError", scheduleToReceiveError);
    }, [scheduleToReceiveData, scheduleToReceiveError, isScheduleToReceiveError, isScheduleToRecevieLoaing]);

    useEffect(() => {
        console.log("passDueData", passDueData);
        console.log("passDueError", passDueError);
    }, [passDueError, passDueData]);


    const {
        data: defaultLoanUserData,
        // isLoading: isDefaultLoanUserLoading,
        // isError: isDefaultLoanUserError,
        error: defaultLoanUserError
    } = useDefaulLoanUser();


    useEffect(() => {
        console.log("defaultLoanUserData", defaultLoanUserData);
        console.log("defaultLoanUserError", defaultLoanUserError);

    }, [defaultLoanUserData, defaultLoanUserError]);

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
                        {/* left section bor borrower*/}
                        {
                            (defaultLoanUserData?.data?.data?.role === "BORROWER") &&
                            <div
                                className="head-right p-1 sm:p-2 flex flex-col items-start justify-between gap-3 self-start  md:p-4 w-full  rounded-md  my-shadow">


                                {/*Left section top-1*/}
                                <div
                                    className="wrapper-both-left-section flex flex-row gap-2 justify-between items-center w-full">
                                    <div className="left-setion-1 ">

                                        <div className="whitespace-nowrap font-medium mr-2">You are schedule to pay:
                                        </div>
                                        <div
                                            className="font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                            <span>$</span>
                                            <span>
                                            {
                                                (amountDueData?.data?.data)
                                                    ? (
                                                        <>
                                                            {amountDueData?.data?.data?.due}
                                                        </>) :
                                                    (
                                                        <span>0</span>)
                                            }</span>
                                        </div>
                                        <div className="whitespace-nowrap font-medium mr-2">

                                                <span>
                                                {
                                                    (amountDueData?.data?.data?.createdAt) ?
                                                        (
                                                            <span>{"By " + formatDate(amountDueData?.data?.data?.createdAt as string)}</span>)
                                                        :
                                                        (<span>By 0000, 0, 0000</span>)
                                                }
                                            </span>


                                        </div>

                                    </div>

                                    <div className="left-setion-2 relative">

                                        {
                                            switchState?.scheduleToReceive && (
                                                <>
                                                    <div className="whitespace-nowrap font-medium mr-2">
                                                        You are scheduled to receive:
                                                    </div>
                                                    <div
                                                        className="font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                                        <span>$</span>
                                                        <span>
                                                        {
                                                            (scheduleToReceiveData?.data?.data) ?
                                                                (<span>{scheduleToReceiveData.data.data?.due}</span>)
                                                                :
                                                                (<span>0</span>)
                                                        }
                                                     </span>
                                                    </div>
                                                    <div className="whitespace-nowrap font-medium mr-2">
                                                    <span>
                                                        {
                                                            (scheduleToReceiveData?.data?.data?.createdAt) ?
                                                                (
                                                                    <span>{"By " + formatDate(scheduleToReceiveData.data.data?.createdAt)}</span>)
                                                                :
                                                                (<span>By 0000, 0, 0000</span>)
                                                        }
                                                    </span>
                                                    </div>
                                                </>
                                            )
                                        }


                                        {
                                            switchState?.pastDueState &&
                                            (
                                                <>
                                                    <div className="whitespace-nowrap text-red-500 font-medium mr-2">
                                                        You have a past due balance!
                                                    </div>
                                                    <div
                                                        className="font-bold sm:font-medium whitespace-nowrap text-base text-red-500 sm:text-xl lg:text-2xl ">
                                                        ${passDueData?.data?.data?.due ? passDueData?.data?.data?.due : "0"}
                                                    </div>
                                                    <div className="whitespace-nowrap text-red-500 font-medium mr-2">Pay
                                                        now
                                                        or contact to FiMguide!
                                                    </div>

                                                </>
                                            )
                                        }

                                        <button onClick={handleSwitchState}
                                                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0">
                                            <GrCaretNext/>
                                        </button>


                                    </div>


                                </div>

                            </div>

                        }


                        {/* left section */}
                        {
                            (defaultLoanUserData?.data?.data?.role === "LENDER") &&
                            <div
                                className="head-right p-1 sm:p-2 flex flex-col items-start justify-between gap-3 self-start  md:p-4 w-full  rounded-md  my-shadow">


                                {/*Left section top-1*/}
                                <div
                                    className="wrapper-both-left-section flex flex-row gap-2 justify-between items-center w-full">
                                    <div className="left-setion-1 relative">

                                        {
                                            switchState?.scheduleToReceive && (
                                                <>
                                                    <div className="whitespace-nowrap font-medium mr-2">
                                                        You are scheduled to receive:
                                                    </div>
                                                    <div
                                                        className="font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                                        <span>$</span>
                                                        <span>
                                                        {
                                                            (amountDueData?.data?.data) ?
                                                                (<span>{amountDueData.data.data?.due}</span>)
                                                                :
                                                                (<span>0</span>)
                                                        }
                                                     </span>
                                                    </div>
                                                    <div className="whitespace-nowrap font-medium mr-2">
                                                    <span>
                                                        {
                                                            (amountDueData?.data?.data?.createdAt) ?
                                                                (
                                                                    <span>{"By " + formatDate(amountDueData.data.data?.createdAt)}</span>)
                                                                :
                                                                (<span>By 0000, 0, 0000</span>)
                                                        }
                                                    </span>
                                                    </div>
                                                </>
                                            )
                                        }


                                        {/*Copy from borrower have made any changes yet, careful before you, but this code already be disabled via button*/}
                                        {
                                            switchState?.pastDueState &&
                                            (
                                                <>
                                                    <div className="whitespace-nowrap text-red-500 font-medium mr-2">
                                                        You have a past due balance!
                                                    </div>
                                                    <div
                                                        className="font-bold sm:font-medium whitespace-nowrap text-base text-red-500 sm:text-xl lg:text-2xl ">
                                                        ${passDueData?.data?.data?.due ? passDueData?.data?.data?.due : "0"}
                                                    </div>
                                                    <div className="whitespace-nowrap text-red-500 font-medium mr-2">Pay
                                                        now
                                                        or contact to FiMguide!
                                                    </div>

                                                </>
                                            )
                                        }

                                        {/*<button onClick={handleSwitchState}*/}
                                        {/*        className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0">*/}
                                        {/*    <GrCaretNext/>*/}
                                        {/*</button>*/}


                                    </div>
                                    <div className="left-setion-2 ">

                                        <div className="whitespace-nowrap font-medium mr-2">You are schedule to pay:
                                        </div>
                                        <div
                                            className="font-bold sm:font-medium whitespace-nowrap text-base sm:text-xl lg:text-2xl ">
                                            <span>$</span>
                                            <span>
                                            {
                                                (scheduleToReceiveData?.data?.data)
                                                    ? (
                                                        <>
                                                            {scheduleToReceiveData?.data?.data?.due}
                                                        </>) :
                                                    (
                                                        <span>0</span>)
                                            }</span>
                                        </div>
                                        <div className="whitespace-nowrap font-medium mr-2">

                                                <span>
                                                {
                                                    (scheduleToReceiveData?.data?.data?.createdAt) ?
                                                        (
                                                            <span>{"By " + formatDate(scheduleToReceiveData?.data?.data?.createdAt as string)}</span>)
                                                        :
                                                        (<span>By 0000, 0, 0000</span>)
                                                }
                                            </span>


                                        </div>

                                    </div>


                                </div>

                            </div>

                        }


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
                                                <p>${defaultLoanUserData?.data?.data?.amount}</p>
                                            </div>
                                            <div className="loan-amount flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Contract date
                                                </p>
                                                <p>
                                                    {formatDateToMDY(
                                                        defaultLoanUserData?.data?.data?.createdDate as string
                                                    )}
                                                </p>
                                            </div>
                                            <div className="start-date flex flex-row justify-between">
                                                <p className=" whitespace-nowrap font-medium mr-2">
                                                    Interest
                                                </p>
                                                <p>
                                                    {defaultLoanUserData?.data?.data?.interest}
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
                                                        defaultLoanUserData?.data?.data?.endDate as string
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
            </div>
        </>
    );
};

export default TheLoan;