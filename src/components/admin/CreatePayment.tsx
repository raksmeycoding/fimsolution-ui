import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FaEdit, FaRegSave} from 'react-icons/fa';
import useCreatePayment from '../../hooks/useCreatePayment'; // Custom hook to handle payment submission
import useAllSchedules from '../../hooks/useAllSchedules'; // Hook to fetch schedules
import {PaymentReqDto, ScheduleResDto} from '../../types';
import {useAllPayments} from "../../hooks/useAllPayments";
import useAllLoans from "../../hooks/useAllLoans";
import {MdDeleteOutline} from "react-icons/md";

// Define payment types and constants
const paymentTypeEnum = ["REGULAR", "ADJUSTMENT", "PENALTY"] as const;
const paymentStatusEnum = ["ON_TIME", "DELAYED", "PENDING"] as const;
const paymentSourceEnum = ["BORROWER", "LENDER"] as const;

// Define the form validation schema
const paymentFormSchema: z.ZodSchema<PaymentReqDto> = z.object({
    scheduleId: z.string({message: "Schedule Id is required"}),
    loanId: z.string({message: "Loan ID is required"}),
    paymentDate: z.string({message: "Payment date is required"}),
    createdAt: z.string({message: "Creation date is required"}),
    amount: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    adjust: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    principle: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    fimFee: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    receipt: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    balance: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    type: z.enum(paymentTypeEnum),
    status: z.enum(paymentStatusEnum),
    source: z.enum(paymentSourceEnum),
    memo: z.string().optional(),
});


const CreatePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const {data: schedulesData, isLoading: isLoadingSchedules} = useAllSchedules();
    const {mutate: createPayment, isPending, isSuccess} = useCreatePayment();
    const {
        data: allPaymentsData,
        error: allPaymentsError,
        isSuccess: isSuccessAllPayment,
        isLoading: isLoadingAllPayments,
        isPending: isPendingAllPayments,
        isError: isAllPayemtError
    } = useAllPayments();

    // React Hook Form setup
    const {register, handleSubmit, watch, control, formState: {errors}} = useForm<PaymentReqDto>({
        resolver: zodResolver(paymentFormSchema),
        mode: "all"
    });

    const formValue = watch();


    useEffect(() => {
        console.log("Watching create payment:", formValue)
        console.log("Watching errors:", errors);

        setIsProcessing(false)
    }, [formValue, errors, isSuccess]);

    useEffect(() => {
        console.log("All payment error:", allPaymentsError)
        console.log("All payments data:", allPaymentsData)
    }, [allPaymentsData, allPaymentsError]);

    const onSubmit = (data: PaymentReqDto) => {
        setIsProcessing(true);
        createPayment(data)
    };

    const {data: allLoans, isLoading: isAllLoanLoading} = useAllLoans();

    return (

        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">User ID</th>
                        <th className="px-4 py-2 text-left">Family Name</th>
                        <th className="px-4 py-2 text-left">Given Name</th>
                        <th className="px-4 py-2 text-left">Middle Name</th>
                        <th className="px-4 py-2 text-left">Nick Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allPaymentsData?.data?.map((payment) => (
                        <tr key={payment.id} className="border-t">
                            <td className="px-4 py-2">{payment?.id?.slice(0, 8) + "..."}</td>
                            <td className="px-4 py-2">{payment.paymentDate}</td>
                            <td className="px-4 py-2">{payment.createdAt}</td>
                            <td className="px-4 py-2">{payment.amount}</td>
                            <td className="px-4 py-2">{payment.adjust}</td>
                            <td className="px-4 py-2">{payment.balance}</td>
                            <td className="px-4 py-2 flex">
                                <button type="button"><FaRegSave className="text-amber-500 text-sm"/></button>
                                <button type="button"><FaEdit className="text-teal-600"/></button>
                                <button type="button"><MdDeleteOutline className="text-red-600"/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <table className="table-auto bg-white shadow-md rounded-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Field</th>
                            <th className="px-4 py-2 text-left">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Schedule ID */}
                        <tr>
                            <td className="px-4 py-2">Schedule ID</td>
                            <td className="px-4 py-2">
                                <select {...register('scheduleId')} className="px-2 py-1 border">
                                    <option value="">Select Schedule</option>
                                    {schedulesData?.map((schedule: ScheduleResDto) => (
                                        <option key={schedule.id} value={schedule.id}>
                                            {schedule.id?.slice(0, 8) + '...'}
                                        </option>
                                    ))}
                                </select>
                                {errors.scheduleId && <span className="text-red-600">{errors.scheduleId.message}</span>}
                            </td>
                        </tr>

                        {/* Loan ID */}
                        <tr>
                            <td className="px-4 py-2">Loan ID</td>
                            <td className="px-4 py-2">
                                <select
                                    {...register('loanId')} className="px-2 py-1 border"
                                >
                                    <option value="">Select Loan</option>
                                    {allLoans?.data.map((loan) => {
                                        return (
                                            <option key={loan.id}
                                                    value={loan.id}>{loan?.id.slice(0, 8) + "..."}</option>
                                        )
                                    })}
                                </select>
                                {errors.loanId && <span className="text-red-600">{errors.loanId.message}</span>}
                            </td>
                        </tr>

                        {/* Payment Date */}
                        <tr>
                            <td className="px-4 py-2">Payment Date</td>
                            <td className="px-4 py-2">
                                <input
                                    type="datetime-local"
                                    {...register('paymentDate')}
                                    className="px-2 py-1 border"
                                />
                                {errors.paymentDate &&
                                    <span className="text-red-600">{errors.paymentDate.message}</span>}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Created Date</td>
                            <td className="px-4 py-2">
                                <input
                                    type="datetime-local"
                                    {...register('createdAt')}
                                    className="px-2 py-1 border"
                                />
                                {errors.createdAt && <span className="text-red-600">{errors.createdAt.message}</span>}
                            </td>
                        </tr>

                        {/* Amount */}
                        <tr>
                            <td className="px-4 py-2">Amount</td>
                            <td className="px-4 py-2">


                                <input
                                    type="text"
                                    {...register('amount')}
                                    className="px-2 py-1 border w-full"
                                    step="any"
                                />
                                <div>{errors.amount &&
                                    <span className="text-red-600 text-sm">{errors.amount.message}</span>}</div>


                            </td>
                        </tr>

                        {/* Adjust */}
                        <tr>
                            <td className="px-4 py-2">Adjustment</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    {...register('adjust')}
                                    className="px-2 py-1 border"
                                    step="any"
                                />
                                <div>{errors.adjust &&
                                    <span className="text-red-600 text-sm">{errors.adjust.message}</span>}</div>
                            </td>
                        </tr>

                        {/* Principle */}
                        <tr>
                            <td className="px-4 py-2">Principle</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    {...register('principle')}
                                    className="px-2 py-1 border"
                                    step="any"
                                />
                                <div>{errors.principle &&
                                    <span className="text-red-600 text-sm">{errors.principle.message}</span>}</div>
                            </td>
                        </tr>

                        {/* Fim Fee */}
                        <tr>
                            <td className="px-4 py-2">Fim Fee</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    {...register('fimFee')}
                                    className="px-2 py-1 border"
                                    step="any"
                                />
                                <div>{errors.fimFee &&
                                    <span className="text-red-600 text-sm">{errors.fimFee.message}</span>}</div>
                            </td>
                        </tr>

                        {/* Receipt */}
                        <tr>
                            <td className="px-4 py-2">Receipt</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    {...register('receipt')}
                                    className="px-2 py-1 border"
                                    step="any"
                                />
                                <div>{errors.receipt &&
                                    <span className="text-red-600 text-sm">{errors.receipt.message}</span>}</div>
                            </td>
                        </tr>

                        {/* Balance */}
                        <tr>
                            <td className="px-4 py-2">Balance</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    {...register('balance')}
                                    className="px-2 py-1 border"
                                    step="any"
                                />
                                <div>{errors.balance &&
                                    <span className="text-red-600 text-sm">{errors.balance.message}</span>}</div>
                            </td>
                        </tr>

                        {/* Payment Type */}
                        <tr>
                            <td className="px-4 py-2">Payment Type</td>
                            <td className="px-4 py-2">
                                <select {...register('type')} className="px-2 py-1 border">
                                    {paymentTypeEnum.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        {/* Payment Status */}
                        <tr>
                            <td className="px-4 py-2">Payment Status</td>
                            <td className="px-4 py-2">
                                <select {...register('status')} className="px-2 py-1 border">
                                    {paymentStatusEnum.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        {/* Payment Source */}
                        <tr>
                            <td className="px-4 py-2">Source</td>
                            <td className="px-4 py-2">
                                <select {...register('source')} className="px-2 py-1 border">
                                    {paymentSourceEnum.map((source) => (
                                        <option key={source} value={source}>
                                            {source}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        {/* Memo */}
                        <tr>
                            <td className="px-4 py-2">Memo</td>
                            <td className="px-4 py-2">
                            <textarea
                                id="memo"
                                {...register("memo")}
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                rows={3}
                            />
                                {/*<textarea*/}
                                {/*    {...register('memo')}*/}
                                {/*    rows={3}*/}
                                {/*    className="px-2 py-1 border"*/}

                                {/*/>*/}
                                <div>{errors.memo &&
                                    <span className="text-red-600 text-sm">{errors.memo.message}</span>}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <button type="submit" disabled={isProcessing}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    {isProcessing ? 'Processing...' :
                        <div className="flex flex-row gap-1 items-center justify-center"><FaRegSave/> Save Payment
                        </div>}
                </button>
            </form>
        </>
    );
};

export default CreatePayment;