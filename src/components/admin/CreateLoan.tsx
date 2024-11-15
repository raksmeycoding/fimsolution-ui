import React from 'react';
import {z, ZodSchema} from "zod";
import {LoanResDto, RequestDto, RespondDto} from "../../types";
import {useMutation, useQuery} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import d from "../../constant/constant";
import queryClient from "../../utils/clients/queryClient";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FaEdit, FaRegSave} from "react-icons/fa";
import {MdDeleteOutline} from "react-icons/md";
import useAllLoans from "../../hooks/useAllLoans";
import useCreateLoan from "../../hooks/useCreateLoan";


// Define the User type and validation schema
// type Loan = {
//     userId: string;
//     familyName: string;
//     givenName: string;
//     middleName: string;
//     nickName: string;
//     email: string;
// };

const loanTypeEnum = ["REVOLVING", "COLLATERAL", "FIXED"] as const;

const formSchema: ZodSchema<LoanResDto> = z.object({
    id: z.string(),
    nickName: z.string(),
    interest: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    loanType: z.enum(["REVOLVING", "COLLATERAL", "FIXED"]), // Using Zod Enum,
    amount: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    fee: z.string().regex(/^[-+]?\d+(\.\d+)?$/, {
        message: "Must be a number with at most one decimal point",
    }),
    note: z.string(),
    createdDate: z.string(),
    endDate: z.string(),
    isLinkToLoanUser: z.string()
});


const CreateLoan = () => {
    const [isEditingUser, setIsEditingUser] = React.useState(false);
    const [isPopUpCreateUserForm, setIsPopUpCreateUserForm] = React.useState(false);


    const handleCreatUser = (formData: LoanResDto) => {
        const requestBody: RequestDto<LoanResDto> = {
            request: {
                ...formData
            }
        }

        console.log("Create Loan:", requestBody)

        createLoan(requestBody)

        setIsEditingUser((pre) => !pre);
    };

    const handleToggle = () => {
        setIsEditingUser((pre) => !pre);
    };

    const dataTemplate: LoanResDto = {
        id: "",
        nickName: "",
        interest: "0",
        loanType: "FIXED",
        amount: "0",
        fee: "0",
        note: "",
        createdDate: "",
        endDate: "",
        isLinkToLoanUser: "",
    };

    const disabledKey: (keyof LoanResDto)[] = ["id"];

    const form = useForm<LoanResDto>({
        defaultValues: dataTemplate,
        resolver: zodResolver(formSchema),
        mode: "all"
    });

    const {register, handleSubmit, formState: {errors}} = form;

    const disableByKey = (key: keyof LoanResDto) => disabledKey.includes(key);

    // Using the custom hook to create a loan
    const {mutate: createLoan, isPending: isPendingCreatLoan} = useCreateLoan();

    // Using the custom hook to fetch all loans
    const {data: loansData, isLoading, error} = useAllLoans();


    const cancelAddUserHandler = () => {
        setIsEditingUser((pre) => !pre)
    }


    return (
        <>
            <form onSubmit={handleSubmit(handleCreatUser)}>
                {/* Table displaying user records */}
                <div className="overflow-x-scroll">
                    <table className="table-auto w-full overflow-x-scroll bg-white shadow-md rounded-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-nowrap">Loan ID</th>
                            <th className="px-4 py-2 text-left text-nowrap">Nick Name</th>
                            <th className="px-4 py-2 text-left text-nowrap">Interest</th>
                            <th className="px-4 py-2 text-left text-nowrap">Loan Type</th>
                            <th className="px-4 py-2 text-left text-nowrap">Amount</th>
                            <th className="px-4 py-2 text-left text-nowrap">Fee</th>
                            <th className="px-4 py-2 text-left text-nowrap">Notes</th>
                            <th className="px-4 py-2 text-left text-nowrap">Created Date</th>
                            <th className="px-4 py-2 text-left text-nowrap">End Date</th>
                            <th className="px-4 py-2 text-left text-nowrap">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loansData?.data?.map((loan: LoanResDto) => (
                            <tr key={loan.id || loan.nickName} className="border-t">
                                <td className="px-4 py-2">{loan?.id?.slice(0, 8) + "..."}</td>
                                <td className="px-4 py-2">{loan.nickName}</td>
                                <td className="px-4 py-2">{loan.interest}</td>
                                <td className="px-4 py-2">{loan.loanType}</td>
                                <td className="px-4 py-2">{loan.amount}</td>
                                <td className="px-4 py-2">{loan.fee}</td>
                                <td className="px-4 py-2">{loan.note}</td>
                                <td className="px-4 py-2">{loan.createdDate}</td>
                                <td className="px-4 py-2">{loan.endDate}</td>
                                <td className="px-4 py-2 flex">
                                    <button type="button"><FaRegSave className="text-amber-500 text-sm"/></button>
                                    <button type="button" onClick={() => {
                                        console.log(loan)
                                    }}><FaEdit className="text-teal-600"/></button>
                                    <button type="button"><MdDeleteOutline className="text-red-600"/></button>
                                </td>
                            </tr>
                        ))}

                        {/* Editable form row */}
                        {isEditingUser && (
                            <tr key={dataTemplate.id || "editable-row"}>
                                <td className="px-4 py-2"><input disabled {...register("id")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["id"] &&
                                        <span className="text-red-600 text-sm">{errors["id"]?.message}</span>}
                                </td>
                                <td className="px-4 py-2"><input type="text" {...register("nickName")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["nickName"] &&
                                        <span className="text-red-600 text-sm">{errors["nickName"]?.message}</span>}
                                </td>

                                <td className="px-4 py-2"><input type="text" {...register("interest")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["interest"] &&
                                        <span className="text-red-600 text-sm">{errors["interest"]?.message}</span>}
                                </td>

                                <td>

                                    <select {...register("loanType")} className="px-2 py-1 border">
                                        <option value="">Select Loan Type</option>
                                        {
                                            loanTypeEnum.map((loanType) => {
                                                return (
                                                    <>
                                                        <option key={loanType} value={loanType}>{loanType}</option>
                                                    </>
                                                );
                                            })
                                        }
                                    </select>

                                </td>

                                <td className="px-4 py-2"><input type="text" {...register("amount")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["amount"] &&
                                        <span className="text-red-600 text-sm">{errors["amount"]?.message}</span>}
                                </td>

                                <td className="px-4 py-2"><input type="text" {...register("fee")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["fee"] &&
                                        <span className="text-red-600 text-sm">{errors["fee"]?.message}</span>}
                                </td>

                                <td className="px-4 py-2"><input type="text" {...register("note")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["note"] &&
                                        <span className="text-red-600 text-sm">{errors["note"]?.message}</span>}
                                </td>


                                <td className="px-4 py-2"><input type="datetime-local" {...register("createdDate")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["createdDate"] &&
                                        <span className="text-red-600 text-sm">{errors["createdDate"]?.message}</span>}
                                </td>

                                <td className="px-4 py-2"><input type="datetime-local" {...register("endDate")}
                                                                 className="px-2 py-1 border"/>
                                    {errors["endDate"] &&
                                        <span className="text-red-600 text-sm">{errors["endDate"]?.message}</span>}
                                </td>


                                <td className="px-4 py-2 flex">

                                    <button type="submit">
                                        <FaRegSave className="text-amber-500 text-sm"/>
                                    </button>
                                    <button type="button"><FaEdit className="text-teal-600"/></button>
                                    <button onClick={cancelAddUserHandler}>
                                        <MdDeleteOutline className="text-red-600"/>
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">

                    <button type="button" disabled={isEditingUser} onClick={handleToggle}
                            className="bg-teal-800 text-white rounded px-2 py-1">
                        Create Loan
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateLoan;