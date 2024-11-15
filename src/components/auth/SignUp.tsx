import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {Controller, useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {RequestDto} from "../../types";
import {RegisterRequest} from "../../types/auth";


type FormValues = {
    fistName: string;
    lastName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    phoneNumber: string;
};

const passwordValidation = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()\\[\\]{}:;',?/*~$^+=<>-]).{8,20}$"
);

const formSchema = z
    .object({
        fistName: z
            .string()
            .min(3, {message: "First name is at least 3 letters"})
            .max(10, {message: "First name is at the most 10 letters"}),
        lastName: z
            .string()
            .min(3, {message: "Last name is at least 3 letters"})
            .max(10, {message: "Last name is at the most 10 letters"}),
        email: z.string().email({message: "Invalid email address"}),
        password: z
            .string()
            .min(8, {message: "Password must be at least 8-20"})
            .max(20, {message: "Password must be at most 20 characters"})
            .regex(passwordValidation, {
                message:
                    "One digit, one lowercase letter, one uppercase letter, and one special character.",
            }),
        confirmedPassword: z
            .string()
            .min(8, {message: "Password must be at least 8-20"})
            .max(20, {message: "Password must be at most 20 characters"})
            .regex(passwordValidation, {
                message:
                    "One digit, one lowercase letter, one uppercase letter, and one special character.",
            }),
        phoneNumber: z
            .string()
            .min(10, {message: "Phone number must be at least 10 digits"})
            .max(15, {message: "Phone number must be at most 15 digits"})
            .regex(/^\+?\d+$/, {
                message:
                    "Phone number must contain only digits and an optional leading plus sign",
            }),
    })
    .refine(
        (values) => {
            return values.password === values.confirmedPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmedPassword"],
        }
    );



const errorNotify = (errorMessage: any) => toast.error(errorMessage);

function SignUP() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    // Define default value of Login from using react-hook-form
    const form = useForm<FormValues>({
        defaultValues: {
            fistName: "",
            lastName: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
        mode: "all",
    });

    // Destructuring some functions from object of userForm hooks
    const {
        register: formRegister,
        control,
        handleSubmit,
        formState,
        reset,
    } = form;
    const {errors, isDirty, isValid, isSubmitting} = formState;


    const registerMutation = useMutation({
        retry: false,
        mutationFn: async (request: RequestDto<RegisterRequest>) => {
            return await axiosInstance.post<RequestDto<RegisterRequest>>("/auth/register", request)
        },
        onSuccess: (data) => {
            navigate("/login")

        },
        onError: (error) => {

        }
    })

    const onSubmit = async (data: FormValues) => {
        const requestBody: RequestDto<RegisterRequest> = {
            request: {
                firstName: data.fistName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmedPassword,
                phone: data.phoneNumber

            }
        }
        registerMutation.mutate(requestBody)
        // try {
        //     genericDtoBody.data.firstName = data.fistName;
        //     genericDtoBody.data.lastName = data.lastName;
        //     genericDtoBody.data.email = data.email;
        //     genericDtoBody.data.password = data.password;
        //     genericDtoBody.data.confirmPassword = data.confirmedPassword;
        //     genericDtoBody.data.phone = data.phoneNumber;
        //
        //     const response = await register(genericDtoBody).unwrap();
        //     if (response?.code === "201" && response) {
        //         navigate("/login");
        //     } else {
        //         console.log("onError", response);
        //     }
        // } catch (error: any) {
        //     errorNotify(error?.data?.message);
        // }
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
            <GoogleOAuthProvider clientId="1098801894633-kgl422h9ms3h2o3rsajnv2gbp7s1d04d.apps.googleusercontent.com">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className=" bg-gradient-to-tl from-[#3b7c85] h-screen  flex flex-row justify-center items-center to-[#28ffff] w-full"
                >
                    <div
                        className="flex flex-col items-center justify-center min-w-[320px] sm:min-w-[400px] md:min-w-[450px] lg:min-w-[600px]">
                        {/* <div className="log text-3xl font-bold font-satoshi tracking-widest">
            FiMsolution
          </div> */}

                        <div className="bg-white shadow rounded  w-full p-10 mt-4">
                            <p
                                tabIndex={0}
                                className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
                            >
                                Sign Up to create your account
                            </p>
                            <p
                                tabIndex={0}
                                className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                            >
                                Already have an account?{" "}
                                <Link
                                    to={"/login"}
                                    className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
                                >
                                    {" "}
                                    Login Here
                                </Link>
                            </p>

                            <div className="help-margin mt-4"></div>

                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                size="large"
                                shape="rectangular"
                                type="standard"
                                theme="filled_black"
                            />

                            <div className="flex flex-row justify-between items-center gap-2 md:gap-4 mt-4">
                                <div className="fistName-section w-full">
                                    <label
                                        id="fistName"
                                        className="text-sm font-medium leading-none text-gray-800"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="fistName"
                                        aria-labelledby="fistName"
                                        type="text"
                                        {...formRegister("fistName")}
                                        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    />
                                </div>

                                <div className="lastName-section w-full">
                                    <label
                                        id="lastName"
                                        className="text-sm font-medium leading-none text-gray-800"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        aria-labelledby="lastName"
                                        type="text"
                                        {...formRegister("lastName")}
                                        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    />
                                </div>
                            </div>
                            <p className="text-red-600 text-xs mt-2 overflow-hidden">
                                {errors.fistName?.message}
                            </p>
                            <p className="text-red-600 text-xs mt-2 overflow-hidden">
                                {errors.lastName?.message}
                            </p>

                            {/* Email Section */}
                            <div className="mt-2 w-full">
                                <label
                                    id="email"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    aria-labelledby="email"
                                    id="email"
                                    type="email"
                                    {...formRegister("email")}
                                    className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                            </div>
                            <p className="text-red-600 text-sm overflow-hidden">
                                {errors.email?.message}
                            </p>

                            {/* Password section */}
                            <div className="mt-2  w-full">
                                <label
                                    htmlFor="pass"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Password
                                </label>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        id="password"
                                        type={!showPassword ? "password" : "text"}
                                        {...formRegister("password")}
                                        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    />
                                    <button
                                        title="show password"
                                        onClick={() => setShowPassword((pre) => !pre)}
                                        type="button"
                                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
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

                            {/* Verify password */}
                            <div className="mt-2  w-full">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Confirmed Password
                                </label>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        id="confirmPassword"
                                        type={!showConfirmPass ? "password" : "text"}
                                        {...formRegister("confirmedPassword")}
                                        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    />
                                    <button
                                        title="show confirm password"
                                        onClick={() => {
                                            setShowConfirmPass((pre) => !pre);
                                        }}
                                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
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
                                {errors.confirmedPassword?.message}
                            </p>

                            {/* Phone number section */}
                            {/* <div className="mt-2 w-full">
              <label
                id="phoneNumber"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Phone Number
              </label>
              <input
                value={genericDtoBody.data["phone"]}
                onChange={handleChange}
                name="phone"
                aria-labelledby="phoneNumber"
                type="text"
                className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div> */}
                            <Controller
                                name="phoneNumber"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <PhoneInput
                                        country={"us"}
                                        inputProps={{
                                            name: "phoneNumber",
                                            required: true,
                                            autoFocus: false,
                                        }}
                                        value={field.value}
                                        onChange={(phone) => {
                                            field.onChange(phone); // Update react-hook-form's value
                                            setPhone(phone); // Update local state if needed
                                        }}
                                        containerStyle={{
                                            marginTop: "16px",
                                        }}
                                        inputStyle={{
                                            width: "100%",
                                            height: "2.6rem",
                                        }}
                                        dropdownStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                )}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-600">{errors.phoneNumber.message}</p>
                            )}

                            <div className="mt-4">
                                <button
                                    disabled={
                                        !isDirty || !isValid || isSubmitting
                                    }
                                    type="submit"
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full flex flex-row items-center justify-center"
                                >
                                    {/*{isRegisterLoading ? (*/}
                                    {/*    <div className="spinner"></div>*/}
                                    {/*) : (*/}
                                    {/*    "Sign Up"*/}
                                    {/*)}*/}

                                    {"Sign Up"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </GoogleOAuthProvider>
        </>
    );
}

export default SignUP;
