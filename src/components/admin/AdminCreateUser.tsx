import React, {createContext} from 'react';
import {useForm} from 'react-hook-form';
import {z, ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {FaEdit, FaRegSave} from 'react-icons/fa';
import {MdDeleteOutline} from 'react-icons/md';
import {useMutation, useQuery} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {RequestDto, RespondDto} from "../../types";
import d from "../../constant/constant"
import queryClient from "../../utils/clients/queryClient";
import useCreateUser from "../../hooks/uesCreateUser";
import useUsers from "../../hooks/useUsers";

// Define the User type and validation schema
type User = {
    userId: string;
    familyName: string;
    givenName: string;
    middleName: string;
    nickName: string;
    email: string;
};

const formSchema: ZodSchema<User> = z.object({
    userId: z.string(),
    familyName: z.string(),
    givenName: z.string(),
    middleName: z.string(),
    nickName: z.string(),
    email: z.string().email({message: "Invalid email address"}),
});

function AdminCreateUser() {

    const [isEditingUser, setIsEditingUser] = React.useState(false);
    const [isPopUpCreateUserForm, setIsPopUpCreateUserForm] = React.useState(false);

    const {mutate} = useCreateUser();

    const handleCreatUser = (formData: User) => {
        const requestBody: RequestDto<User> = {
            request: {
                ...formData
            }
        }

        mutate(requestBody)

        setIsEditingUser((pre) => !pre);
    };

    const handleToggle = () => {
        setIsEditingUser((pre) => !pre);
    };

    const dataTemplate: User = {
        userId: "",
        familyName: "",
        givenName: "",
        middleName: "",
        nickName: "",
        email: ""
    };

    const disabledKey: (keyof User)[] = ["userId"];

    const form = useForm<User>({
        defaultValues: dataTemplate,
        resolver: zodResolver(formSchema),
        mode: "all"
    });

    const {register, handleSubmit, formState: {errors}} = form;

    const disableByKey = (key: keyof User) => disabledKey.includes(key);


    const {data: queryData} = useUsers()


    const cancelAddUserHandler = () => {
        setIsEditingUser((pre) => !pre)
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreatUser)}>
                {/* Table displaying user records */}
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
                        {queryData?.data?.map((user) => (
                            <tr key={user.userId} className="border-t">
                                <td className="px-4 py-2">{user.userId?.slice(0, 8) + "..."}</td>
                                <td className="px-4 py-2">{user.familyName}</td>
                                <td className="px-4 py-2">{user.givenName}</td>
                                <td className="px-4 py-2">{user.middleName}</td>
                                <td className="px-4 py-2">{user.nickName}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 flex">
                                    <button type="button"><FaRegSave className="text-amber-500 text-sm"/></button>
                                    <button type="button" onClick={() => {
                                        console.log(user)
                                    }}><FaEdit className="text-teal-600"/></button>
                                    <button type="button"><MdDeleteOutline className="text-red-600"/></button>
                                </td>
                            </tr>
                        ))}

                        {/* Editable form row */}
                        {isEditingUser && (
                            <tr>
                                {(Object.keys(dataTemplate) as (keyof User)[]).map((key) => (
                                    <td key={key} className="px-4 py-2">
                                        <input
                                            disabled={disableByKey(key)}
                                            {...register(key)}
                                            className="px-2 py-1 border"
                                        />
                                        {errors[key] &&
                                            <span className="text-red-600 text-sm">{errors[key]?.message}</span>}
                                    </td>
                                ))}
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
                        Create user
                    </button>
                </div>
            </form>
        </>
    );
}

export default AdminCreateUser;

interface CreateUserContextTypes {
    data: User []
    handleShowInputAddUser: () => void
}

const CreateUserContext = createContext<CreateUserContextTypes | null>(null);

// interface CreateUserContextProviderProp {
//     children: React.ReactNode;
// }

// const CreateUserContextProvider: React.FC<CreateUserContextProviderProp> = ({children}) => {
//
//     return <CreateUserContext.Provider value={}>{children}</CreateUserContext.Provider>;
// }


//
// interface DynamicProp<T extends A> {
//     template: T;
//     indexDisable?: number;
//     disabledKey?: (keyof T)[];
// }


const DynamicTableInputFrom =
    ({template, indexDisable = 0, disabledKey}:
         {
             template: User,
             indexDisable?: number,
             disabledKey?: (keyof User)[];
         }) => {


        const form = useForm<User>({
            defaultValues: template,
            resolver: zodResolver(formSchema),
            mode: "all"
        })

        const {register, handleSubmit, formState: {errors}} = form;

        const disableIndex: string = Object.keys(template)[indexDisable];
        const disableByKey = (key: keyof User) => disabledKey?.includes(key) ?? false;

        return (
            <>
                <tr className="border-t">

                    {

                        (Object.keys(template) as (keyof User & { actions: string })[]).map((key) => {
                            return (
                                <>
                                    <td key={key} className="px-4 py-2">
                                        <input
                                            disabled={disabledKey ? disableByKey(key) : key === disableIndex}
                                            {...register(key)}
                                            className="px-2 py-1 border"
                                        />

                                    </td>

                                </>

                            );
                        })

                    }

                    {/* Add an additional column for actions */}
                    <td className="px-4 py-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Update</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                    </td>


                </tr>
            </>
        )
    }


const FormCreateUser = () => {
    return (

        <>
            <div>Let create user</div>
        </>
    );
}

// dummyData.js






