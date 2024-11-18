import React, {useEffect} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosInstance from "../../api/axiosInstance";
import d from "../../constant/constant";
import queryClient from "../../utils/clients/queryClient";
import {FaEdit, FaRegSave} from "react-icons/fa";
import {MdDeleteOutline} from "react-icons/md";
import {LoanReqDto, RequestDto, RespondDto} from "../../types";
import {LoanUserReqDto, LoanUserResDto} from "../../types/loan/loan";
import useUsers from "../../hooks/useUsers";
import useAllLoans from "../../hooks/useAllLoans";
import toast, {Toaster} from "react-hot-toast";
import {AxiosError} from "axios";


const loanTypeEnum = ["INFO", "ACCESS", "DECIDE", "TEAM"] as const

// Define the enums for validation
export const USER_ROLE_ENUM = z.enum(["LENDER", "BORROWER", "PROXY"]);
export const USER_TYPE_ENUM = z.enum(["INFO", "ACCESS", "DECIDE", "TEAM"]);
export const USER_PRIORITY_ENUM = z.enum(["DEFAULT", "NONE_DEFAULT"]);

// Zod validation schema for LoanUserReqDto
export const loanUserReqDtoSchema = z.object({
    userId: z.string(), // Assuming ID is a required string
    loanId: z.string(), // Assuming loanUserId is a required string
    loanName: z.string().min(1, "Loan Name is required"), // Assuming loanName is required
    role: USER_ROLE_ENUM, // Using the enum to validate the role
    type: USER_TYPE_ENUM, // Using the enum to validate the type
    prioritize: USER_PRIORITY_ENUM, // Using the enum to validate the priority
    memo: z.string().optional(), // Memo is optional, can be an empty string or undefined
    email: z.string().email("Invalid email address").min(1, "Email is required"), // Email is required and must be valid
});

const errorToast = (error: any) => toast.error(error.message);

const CreateLoanUser = () => {
    const [isEditingUser, setIsEditingUser] = React.useState(false);
    const {mutate, isPending} = useMutation({
        onMutate: () => {
            toast.loading("Loan user is creating...", {id: "create-loan-user-id"})
        },
        mutationFn: async (requestBody: RequestDto<LoanUserReqDto>) => {
            // console.log("Prepare sending:", requestBody)
            const response = await axiosInstance.post<RespondDto<LoanReqDto>>(d.apiUrl.loan.POST_CREATE_LOAN_USER, requestBody);
            return response.data;
        },
        onSuccess: async (data) => {
            // console.log("Loan user created successfully:", data);
            await queryClient.invalidateQueries({queryKey: [d.key.loan.ALL_LOAN_USER_KEY]});
            toast.success("Create loan user successfully", {id: "create-loan-user-id"})
        },
        onError: (error: AxiosError<RespondDto<any>>) => {
            if (error.response) {
                // If the error is from the server (4xx, 5xx status codes)
                const errorMessage = error.response?.data?.message || "An error occurred while creating loan user.";
                console.error("Error axios: ", error?.response?.data?.message);
                toast.error(errorMessage, {id: "create-loan-user-id"}); // Show error in a toast notification
            } else {
                // If the error is due to network issues or other unexpected errors
                toast.error("Network error, please try again later.", {id: "create-loan-user-id"});
            }
        },
        onSettled: () => {
            // toast.dismiss("create-loan-user-id")
        }
    });


    const handleCreateLoanUser = (formData: LoanUserReqDto) => {
        console.log("Create Loan:", formData);
        const requestBody: RequestDto<LoanUserReqDto> = {
            request: {...formData},
        };

        console.log("Request Body:", requestBody);
        mutate(requestBody); // Trigger mutation
    };


    const form = useForm<LoanUserReqDto>({
        resolver: zodResolver(loanUserReqDtoSchema),
        defaultValues: {
            userId: "",   // This is set to an empty string by default
            loanId: "",
            loanName: "",
            role: "BORROWER", // Default role is "BORROWER"
            type: "INFO",    // Default type is "INFO"
            prioritize: "DEFAULT",  // Default prioritize value
            memo: "",
            email: "",
        },
        mode: "all",
    });


    const {register, handleSubmit, control, watch, formState: {errors}} = form;

    const formValues = watch();

    useEffect(() => {
        const {formState: {errors}} = form;
        console.log("Form errors:", errors);

        console.log("Watching from values objects:", formValues)
    }, [form, formValues]);

    const cancelCreateHandler = () => {
        setIsEditingUser(false); // Close form without saving
    };

    const {data: loanUserData, error} = useQuery({
        queryKey: [d.key.loan.ALL_LOAN_USER_KEY],
        queryFn: async () => {
            return await axiosInstance.get<RespondDto<LoanUserResDto[]>>(d.apiUrl.loan.GET_ALL_LOAN_USER);
        },

        staleTime: Infinity,
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        console.log("error", error)
    }, [error]);

    const {data: existingUsers} = useUsers();

    const {data: allExistingLoans} = useAllLoans();


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">User ID</th>
                        <th className="px-4 py-2 text-left">Loan Id</th>
                        <th className="px-4 py-2 text-left">Loan Name</th>
                        <th className="px-4 py-2 text-left">Loan Type</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Prioritize</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loanUserData?.data?.data?.map((loanUser) => (
                        <tr key={loanUser?.loan?.id} className="border-t">
                            <td className="px-4 py-2">{loanUser?.user?.id?.slice(0, 8) + "..."}</td>
                            <td className="px-4 py-2">{loanUser?.loan?.id?.slice(0, 8) + "..."}</td>
                            <td className="px-4 py-2">{loanUser?.loanName}</td>
                            <td className="px-4 py-2">{loanUser?.type}</td>
                            <td className="px-4 py-2">{loanUser?.email}</td>
                            <td className="px-4 py-2">{loanUser?.prioritize}</td>
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
            <div className="p-6 bg-white rounded shadow-lg">

                <form onSubmit={handleSubmit(handleCreateLoanUser)} className="space-y-6">

                    {/* Loan User Form */}
                    {isEditingUser ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="userId" className="mb-1 text-sm font-medium text-gray-700">User
                                        ID</label>
                                    {
                                        existingUsers ?
                                            (
                                                <>
                                                    <Controller
                                                        name="userId"
                                                        control={control}
                                                        rules={{required: "User Id is required"}}
                                                        render={({field}) => (
                                                            <select {...field} className="px-2 py-1 border">
                                                                <option className="text-gray-500" value="">
                                                                    Select Existed User
                                                                </option>
                                                                {existingUsers?.data.map((user) => (
                                                                    <option key={user.userId} value={user.userId}>
                                                                        {user.userId}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    />

                                                </>
                                            ) :
                                            (
                                                <>

                                                    <input
                                                        id="userId"
                                                        {...register("userId")}
                                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                                    />

                                                    {errors.userId &&
                                                        <span
                                                            className="text-red-600 text-sm">{errors.userId.message}</span>}
                                                </>
                                            )
                                    }


                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="loanId" className="mb-1 text-sm font-medium text-gray-700">Loan
                                        ID</label>
                                    {
                                        allExistingLoans ?
                                            (
                                                <>
                                                    <Controller
                                                        name="loanId"
                                                        control={control}
                                                        rules={{required: "Loan type is required"}}
                                                        render={({field}) => (
                                                            <select {...field} className="px-2 py-1 border">
                                                                <option className="text-gray-500" value="">
                                                                    Select Existed Loan
                                                                </option>
                                                                {allExistingLoans?.data.map((loan) => (
                                                                    <option key={loan.id} value={loan.id}>
                                                                        {loan.id}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    />

                                                </>
                                            ) :
                                            (
                                                <>

                                                    <input
                                                        id="loanId"
                                                        {...register("loanId")}
                                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                                    />

                                                    {errors.loanId &&
                                                        <span
                                                            className="text-red-600 text-sm">{errors.loanId.message}</span>}
                                                </>
                                            )
                                    }
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="loanName" className="mb-1 text-sm font-medium text-gray-700">Loan
                                        Name</label>
                                    <input
                                        id="loanName"
                                        {...register("loanName")}
                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                    {errors.loanName &&
                                        <span className="text-red-600 text-sm">{errors.loanName.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="role"
                                           className="mb-1 text-sm font-medium text-gray-700">Role</label>
                                    <select id="role" {...register("role")}
                                            className="px-4 py-2 border border-gray-300 rounded-md">
                                        <option value="BORROWER">BORROWER</option>
                                        <option value="LENDER">LENDER</option>
                                        <option value="PROXY">PROXY</option>
                                    </select>
                                    {errors.role && <span className="text-red-600 text-sm">{errors.role.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="prioritize"
                                           className="mb-1 text-sm font-medium text-gray-700">Prioritize</label>
                                    <select id="prioritize" {...register("prioritize")}
                                            className="px-4 py-2 border border-gray-300 rounded-md">
                                        <option value="DEFAULT">DEFAULT</option>
                                        <option value="NONE_DEFAULT">NONE_DEFAULT</option>
                                    </select>
                                    {errors.prioritize &&
                                        <span className="text-red-600 text-sm">{errors.prioritize.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="type" className="mb-1 text-sm font-medium text-gray-700">Loan
                                        Type</label>
                                    <select id="type" {...register("type")}
                                            className="px-4 py-2 border border-gray-300 rounded-md">
                                        {loanTypeEnum.map((loanType) => (
                                            <option key={loanType} value={loanType}>{loanType}</option>
                                        ))}
                                    </select>
                                    {errors.type && <span className="text-red-600 text-sm">{errors.type.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email"
                                           className="mb-1 text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        id="email"
                                        {...register("email")}
                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                    {errors.email &&
                                        <span className="text-red-600 text-sm">{errors.email.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="memo"
                                           className="mb-1 text-sm font-medium text-gray-700">Memo</label>
                                    <textarea
                                        id="memo"
                                        {...register("memo")}
                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                        rows={3}
                                    />
                                    {errors.memo && <span className="text-red-600 text-sm">{errors.memo.message}</span>}
                                </div>
                            </div>

                            <td className="px-4 py-2 flex">

                                <button type="submit">
                                    <FaRegSave className="text-amber-500 text-sm"/>
                                </button>
                                <button type="button"><FaEdit className="text-teal-600"/></button>
                                <button onClick={cancelCreateHandler}>
                                    <MdDeleteOutline className="text-red-600"/>
                                </button>
                            </td>

                            <div className="mt-4 flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-white rounded px-6 py-2 flex items-center"
                                >
                                    <FaRegSave className="mr-2"/> Save Loan User
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelCreateHandler}
                                    className="bg-gray-300 text-black rounded px-6 py-2 flex items-center"
                                >
                                    <MdDeleteOutline className="mr-2"/> Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setIsEditingUser(true)}
                                className="bg-teal-800 text-white rounded px-6 py-2"
                            >
                                Create Loan User
                            </button>
                        </div>

                    )}
                </form>
            </div>
        </>
    );
};

export default CreateLoanUser;
