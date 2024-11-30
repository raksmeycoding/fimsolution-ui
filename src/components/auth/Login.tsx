import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";


import toast, {Toaster} from "react-hot-toast";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {RequestDto, RespondDto} from "../../types";
import {ResponseUserInfo, UserLoginRequest} from "../../types/auth";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import queryClient from "../../utils/clients/queryClient";
import d from "../../constant/constant"
import {AxiosError} from "axios";
import useAuth from "../../contexts/auth/useAuth";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {IoArrowBackCircleOutline} from "react-icons/io5";

// const successNotify = () => toast.success("Login successful");
const errorNotify = (errorMessage: any) => toast.error(errorMessage);

/**
 * NOTE: This is for validation and schema for react hook from
 */

type FormValues = {
    email: string;
    password: string;
};

const passwordValidation = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()\\[\\]{}:;',?/*~$^+=<>-]).{8,20}$"
);

const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8-20"})
        .max(20, {message: "Password must be at most 20 characters"})
        .regex(passwordValidation, {
            message:
                "One digit, one lowercase letter, one uppercase letter, and one special character.",
        }),
});

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const {isAuthenticated, setIsAuthenticated, setToken, token} = useAuth();

    const loginMutation = useMutation({
        retry: false,
        mutationFn: async (request: RequestDto<UserLoginRequest>) => {
            return await axiosInstance.post<RespondDto<ResponseUserInfo>>("/auth/login", request);
        },
        onSuccess: (data) => {


            queryClient.setQueryData([d.key.ACCESS_TOKEN_KEY], data.data.data.token)

            setIsAuthenticated(true)

            setToken(data.data.data.token!)

            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_1)

            const authToken: string = data.data.data.token as string;

            const userRoles: string[] = jwtDecode<JwtPayload & { roles: string[] }>(authToken).roles;
            // console.log(userRoles);
            if (userRoles.includes("ROLE_ADMIN")) {
                navigate("/dash");
            } else if (userRoles.includes("ROLE_USER")) {
                navigate("/my-loan")
            } else {
                navigate("/")
            }


        },
        onError: (error: AxiosError<RespondDto<any>>) => {
            errorNotify(error?.response?.data?.message);
            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_0)

        }
    })
    useEffect(() => {
        // console.log("Watch isAuthenticated state:", isAuthenticated)
        // console.log("Watch token:", token)
    }, [isAuthenticated, setIsAuthenticated, setToken, token]);

    // Define default value of Login from using react-hook-form
    const form = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    });

    // Destructuring some functions from object of userForm hooks
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;


    const onSubmit = (data: FormValues) => {
        const requestBody: RequestDto<UserLoginRequest> = {request: {email: data.email, password: data.password}};
        loginMutation.mutate(requestBody)
    };

    const handleLoginSuccess = (credentialResponse: any) => {
        // console.log("Login Success:", credentialResponse);
        // You can also save the token or user data here
    };

    const handleLoginError = () => {
        // console.log("Login Failed");
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {/* Login form */}
            <GoogleOAuthProvider clientId="1098801894633-kgl422h9ms3h2o3rsajnv2gbp7s1d04d.apps.googleusercontent.com">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" bg-gradient-to-tl from-[#3b7c85] h-screen  flex flex-row justify-center items-center to-[#28ffff] w-full"
                    noValidate
                >

                    <div
                        className="flex flex-col items-center justify-center min-w-[320px] sm:w-[400px] md:w-[450px] lg:w-[600px]">


                        <div className="bg-white shadow rounded w-full  p-10 mt-4 ">

                            <Link to="/">
                                <div
                                    className="back-to-home flex flex-row gap-2 items-center bg-gray-200 rounded p-1 w-fit px-2 cursor-pointer ">
                                    <IoArrowBackCircleOutline/> <span>Back</span>
                                </div>
                            </Link>

                            <p
                                tabIndex={0}
                                className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mt-4"
                            >
                            Login to your account
                            </p>

                            <p
                                tabIndex={0}
                                className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                            >
                                Dont have account?{" "}
                                <Link
                                    to={"/signup"}
                                    className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
                                >
                                    {" "}
                                    Sign up here
                                </Link>
                            </p>

                            {/* TODO: Will me implement login with google later */}
                            {/* <button
                aria-label="Continue with google"
                role="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                    fill="#EB4335"
                  />
                </svg>
                <p className="text-base font-medium ml-4 text-gray-700">
                  Continue with Google
                </p>
              </button> */}

                            <div className="for-space mt-4"></div>

                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                size="large"
                                shape="rectangular"
                                type="standard"
                                theme="filled_black"
                            />

                            <div className="w-full flex items-center justify-between py-5">
                                <hr className="w-full bg-gray-400"/>
                                <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                                    OR
                                </p>
                                <hr className="w-full bg-gray-400  "/>
                            </div>

                            {/* Email Section */}
                            <div>
                                <label
                                    id="email"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    aria-labelledby="email"
                                    type="email"
                                    id="email"
                                    // value={genericDtoBody.data["email"]}
                                    // onChange={handleChange}
                                    {...register("email")}
                                    className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    autoComplete="email"
                                />
                            </div>
                            <p className="text-red-600 text-sm">{errors.email?.message}</p>

                            {/* Password section */}
                            <div className="mt-6  w-full">
                                <label
                                    htmlFor="pass"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Password
                                </label>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        title="eye"
                                        type="button"
                                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
                                        onClick={() => {
                                            console.log("showpassword state" + showPassword);
                                            setShowPassword((pre) => !pre);
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                                fill="#71717A"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <p className="text-red-600 text-sm overflow-hidden">
                                {errors.password?.message}
                            </p>

                            <div className="mt-8">
                                <button
                                    // disabled={!isDirty || !isValid || isSubmitting || isLoading}
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full flex items-center justify-center"
                                >
                                    {/*{isLoading ? <div className="spinner"></div> : "Login"}*/}
                                    {"Login"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <DevTool control={control} /> */}
                </form>
            </GoogleOAuthProvider>
        </>
    );
}

export default Login;
