import React from 'react';
import {useForm} from 'react-hook-form';
import {z, ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {FaEdit, FaRegSave} from 'react-icons/fa';
import {MdDeleteOutline} from 'react-icons/md';
import {RequestDto} from "../../types";
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


    const form = useForm<User>({
        defaultValues: dataTemplate,
        resolver: zodResolver(formSchema),
        mode: "all"
    });

    const {register, handleSubmit, formState: {errors}} = form;



    const {data: queryData} = useUsers()


    const cancelAddUserHandler = () => {
        setIsEditingUser((pre) => !pre)
    }

    return (
        <>

            <div className="container mx-auto">
                <form onSubmit={handleSubmit(handleCreatUser)}>
                    {/* Table displaying user records */}
                    <div className="overflow-x-scroll">
                        <table className="table-auto w-full overflow-x-scroll bg-white shadow-md rounded-md">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-nowrap">User ID
                                </th>
                                <th className="px-4 py-2 text-left text-nowrap">Family Name</th>
                                <th className="px-4 py-2 text-left text-nowrap">Given Name</th>
                                <th className="px-4 py-2 text-left text-nowrap">Middle Name</th>
                                <th className="px-4 py-2 text-left text-nowrap">Nick Name</th>
                                <th className="px-4 py-2 text-left text-nowrap">Email</th>
                                <th className="px-4 py-2 text-left text-nowrap">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {queryData?.data?.map((user) => (
                                <tr key={user.userId} className="border-t">
                                    <td className="px-4 py-2 min-w-[200px] sticky bg-gray-100 left-0">{user.userId?.slice(0, 8) + "..."}</td>
                                    <td className="px-4 py-2 min-w-[200px]">{user.familyName}</td>
                                    <td className="px-4 py-2 min-w-[200px]">{user.givenName}</td>
                                    <td className="px-4 py-2 min-w-[200px]">{user.middleName}</td>
                                    <td className="px-4 py-2 min-w-[200px]">{user.nickName}</td>
                                    <td className="px-4 py-2 min-w-[200px]">{user.email}</td>
                                    <td className="px-4 py-2 min-w-[200px] x sticky z-10 right-0 bg-gray-100 items-center justify-center">
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
                                    <td className="px-4 py-2 min-w-[200px] sticky left-0 bg-gray-100">
                                        <input disabled type="text" {...register('userId')} className="px-2 py-1 border w-full"/>
                                        {errors.userId && <span className="text-red-600">{errors.userId.message}</span>}
                                    </td>

                                    <td className="px-4 py-2 min-w-[200px]">
                                        <input type="text" {...register('familyName')}
                                               className="px-2 py-1 border w-full"/>
                                        {errors.familyName && <span className="text-red-600">{errors.familyName.message}</span>}
                                    </td>
                                    <td className="px-4 py-2 min-w-[200px]">
                                        <input type="text" {...register('givenName')}
                                               className="px-2 py-1 border w-full"/>
                                        {errors.givenName &&
                                            <span className="text-red-600">{errors.givenName.message}</span>}
                                    </td>
                                    <td className="px-4 py-2 min-w-[200px]">
                                        <input type="text" {...register('middleName')}
                                               className="px-2 py-1 border w-full"/>
                                        {errors.middleName &&
                                            <span className="text-red-600">{errors.middleName.message}</span>}
                                    </td>
                                    <td className="px-4 py-2 min-w-[200px]">
                                        <input type="text" {...register('nickName')}
                                               className="px-2 py-1 border w-full"/>
                                        {errors.nickName &&
                                            <span className="text-red-600">{errors.nickName.message}</span>}
                                    </td>
                                    <td className="px-4 py-2 min-w-[200px]">
                                        <input type="text" {...register("email")}
                                               className="px-2 py-1 border w-full"/>
                                        {errors.email &&
                                            <span className="text-red-600">{errors.email.message}</span>}
                                    </td>

                                    <td className="px-4 py-2 min-w-[200px] x sticky z-10 right-0 bg-gray-100 items-center justify-center">
                                        <button type="submit">
                                            <FaRegSave className="text-amber-500 text-sm"/>
                                        </button>
                                        <button type="button" onClick={cancelAddUserHandler}>
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
            </div>



        </>
    )
        ;
}

export default AdminCreateUser;




