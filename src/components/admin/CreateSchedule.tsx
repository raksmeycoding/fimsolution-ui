import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z, ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {FaEdit, FaRegSave} from 'react-icons/fa';
import {MdDeleteOutline} from 'react-icons/md';
import useCreateSchedule from '../../hooks/createScheduleRequest';
import useAllSchedules from '../../hooks/useAllSchedules';
import {ScheduleResDto, ScheduleReqDto} from '../../types';
import {formatDate} from '../../utils/helpers';
import useAllLoans from "../../hooks/useAllLoans";

const scheduleSourceEnum = ["BORROWER", "LENDER"] as const;

const scheduleStatusEnum = ["FUTURE", "ON_TIME", "PREPAID", "PAST", "PAST_DUE_5", "PAST_DUE_30", "PAST_DUE_60", "PAST_DUE_90"] as const;
const scheduleDelinquencyEnum = ["ZERO", "THIRTY", "SIXTY", "NINETY", "DEFAULT"] as const;

const formSchema: ZodSchema<ScheduleReqDto> = z.object({
    id: z.string(),
    loanId: z.string(),
    amount: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    adjustment: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    paid: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    due: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    interest: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    principle: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    fimFee: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    balance: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    source: z.enum(scheduleSourceEnum),
    status: z.enum(scheduleStatusEnum),
    delinquency: z.enum(scheduleDelinquencyEnum),
    memo: z.string(),
    createAt: z.string(),
});

const CreateSchedule = () => {
    const [isEditingSchedule, setIsEditingSchedule] = React.useState(false);
    const [isPopUpCreateScheduleForm, setIsPopUpCreateScheduleForm] = React.useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<ScheduleReqDto>({
        defaultValues: {
            id: "",
            loanId: "",
            createAt: "",
            amount: "0",
            adjustment: "0",
            paid: "0",
            due: "0",
            interest: "0",
            principle: "0",
            fimFee: "0",
            balance: "0",
            source: "BORROWER",
            status: "FUTURE",
            delinquency: "ZERO",
            memo: "",
        },
        resolver: zodResolver(formSchema),
        mode: 'all',
    });

    const {mutate: createSchedule, isPending: isPendingCreateSchedule} = useCreateSchedule();
    const {data: schedulesData, isLoading, error} = useAllSchedules();
    const {data: loanData} = useAllLoans();

    useEffect(() => {
        console.log("User all schedules", schedulesData)
        console.log("error useAllSchedules", error)
    }, [error, schedulesData]);

    const handleCreateSchedule = (formData: ScheduleReqDto) => {
        const requestBody: ScheduleReqDto = {...formData};
        console.log('Create Schedule:', requestBody);
        createSchedule(requestBody);
        setIsEditingSchedule((prev) => !prev);
    };

    const cancelAddScheduleHandler = () => {
        setIsEditingSchedule(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateSchedule)}>
                <div className="overflow-x-scroll">
                    <table className="table-auto w-full overflow-x-scroll bg-white shadow-md rounded-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-nowrap">Schedule ID</th>
                            <th className="px-4 py-2 text-left text-nowrap">Loan ID</th>
                            <th className="px-4 py-2 text-left text-nowrap">Amount</th>
                            <th className="px-4 py-2 text-left text-nowrap">Adjustment</th>
                            <th className="px-4 py-2 text-left text-nowrap">Paid</th>
                            <th className="px-4 py-2 text-left text-nowrap">Due</th>
                            <th className="px-4 py-2 text-left text-nowrap">Interest</th>
                            <th className="px-4 py-2 text-left text-nowrap">Principle</th>
                            <th className="px-4 py-2 text-left text-nowrap">Fim Fee</th>
                            <th className="px-4 py-2 text-left text-nowrap">Balance</th>
                            <th className="px-4 py-2 text-left text-nowrap">Source</th>
                            <th className="px-4 py-2 text-left text-nowrap">Status</th>
                            <th className="px-4 py-2 text-left text-nowrap">Delinquency</th>
                            <th className="px-4 py-2 text-left text-nowrap">Memo</th>
                            <th className="px-4 py-2 text-left text-nowrap">Created At</th>
                            <th className="px-4 py-2 text-left text-nowrap flex sticky z-10 right-0 bg-gray-100 top-0 bottom-0 left-0">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedulesData?.map((schedule: ScheduleResDto) => (

                            <tr key={schedule.id} className="border-t">
                                <td className="px-4 py-2">{schedule?.id?.slice(0, 8) + "..."}</td>
                                <td className="px-4 py-2">{schedule.loanId ? (schedule?.loanId?.slice(0, 8) + "...") : "Unknown"}</td>
                                <td className="px-4 py-2">{schedule.amount}</td>
                                <td className="px-4 py-2">{schedule.adjustment}</td>
                                <td className="px-4 py-2">{schedule.paid}</td>
                                <td className="px-4 py-2">{schedule.due}</td>
                                <td className="px-4 py-2">{schedule.interest}</td>
                                <td className="px-4 py-2">{schedule.principle}</td>
                                <td className="px-4 py-2">{schedule.fimFee}</td>
                                <td className="px-4 py-2">{schedule.balance}</td>
                                <td className="px-4 py-2">{schedule.source}</td>
                                <td className="px-4 py-2">{schedule.status}</td>
                                <td className="px-4 py-2">{schedule.delinquency}</td>
                                <td className="px-4 py-2">{schedule.memo}</td>
                                <td className="px-4 py-2">{formatDate(schedule?.createAt as string, true)}</td>
                                <td className="px-4 py-2 flex sticky right-0 bg-gray-100 z-10">


                                    <div className="">
                                        <button type="button" onClick={() => setIsEditingSchedule(true)}>
                                            <FaEdit className="text-teal-600"/>
                                        </button>
                                        <button type="button">
                                            <MdDeleteOutline className="text-red-600"/>
                                        </button>
                                    </div>


                                </td>
                            </tr>

                        ))}
                        {isEditingSchedule && (
                            <tr>
                                <td className="px-4 py-2">
                                    <input disabled type="text" {...register('id')} className="px-2 py-1 border"/>
                                    {errors.id && <span className="text-red-600">{errors.id.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    {/*<input type="text" {...register('loanId')} className="px-2 py-1 border"/>*/}
                                    {/*{errors.loanId && <span className="text-red-600">{errors.loanId.message}</span>}*/}
                                    <select {...register("loanId")} className="px-2 py-1 border">
                                        <option value="">Select Existed Loan</option>
                                        {
                                            loanData?.data.map((loan) => {
                                                return (
                                                    <>
                                                        <option key={loan.id} value={loan.id}>{loan.id}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register('amount')}
                                           className="px-2 py-1 border"/>
                                    {errors.amount && <span className="text-red-600">{errors.amount.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register('adjustment')}
                                           className="px-2 py-1 border"/>
                                    {errors.adjustment &&
                                        <span className="text-red-600">{errors.adjustment.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register('paid')}
                                           className="px-2 py-1 border"/>
                                    {errors.paid &&
                                        <span className="text-red-600">{errors.paid.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register('due')}
                                           className="px-2 py-1 border"/>
                                    {errors.due &&
                                        <span className="text-red-600">{errors.due.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register("interest")}
                                           className="px-2 py-1 border"/>
                                    {errors.interest &&
                                        <span className="text-red-600">{errors.interest.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register("principle")}
                                           className="px-2 py-1 border"/>
                                    {errors.principle &&
                                        <span className="text-red-600">{errors.principle.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register("fimFee")}
                                           className="px-2 py-1 border"/>
                                    {errors.fimFee &&
                                        <span className="text-red-600">{errors.fimFee.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register("balance")}
                                           className="px-2 py-1 border"/>
                                    {errors.balance &&
                                        <span className="text-red-600">{errors.balance.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <select {...register("source")} className="px-2 py-1 border">
                                        {
                                            scheduleSourceEnum.map((source) => {
                                                return (
                                                    <option key={source} value={source}> {source}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.source && <span className="text-red-600">{errors.source.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <select {...register('status')} className="px-2 py-1 border">
                                        {scheduleStatusEnum.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && <span className="text-red-600">{errors.status.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <select {...register("delinquency")} className="px-2 py-1 border">
                                        {
                                            scheduleDelinquencyEnum.map((delinquency) => {
                                                return (
                                                    <option key={delinquency}
                                                            value={delinquency}> {delinquency}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.delinquency &&
                                        <span className="text-red-600">{errors.delinquency.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" {...register('memo')} className="px-2 py-1 border"/>
                                    {errors.memo && <span className="text-red-600">{errors.memo.message}</span>}
                                </td>
                                <td className="px-4 py-2">
                                    <input type="datetime-local" {...register('createAt')}
                                           className="px-2 py-1 border"/>
                                    {errors.createAt && <span className="text-red-600">{errors.createAt.message}</span>}
                                </td>
                                <td className="px-4  flex sticky z-10 right-0 bg-gray-100 top-0 bottom-0 left-0">
                                    <button type="submit">
                                        <FaRegSave className="text-amber-500 text-sm"/>
                                    </button>
                                    <button type="button" onClick={cancelAddScheduleHandler}>
                                        <MdDeleteOutline className="text-red-600"/>
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <button type="button" disabled={isEditingSchedule} onClick={() => setIsEditingSchedule(true)}
                            className="bg-teal-800 text-white rounded px-2 py-1">
                        Create Schedule
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateSchedule;
