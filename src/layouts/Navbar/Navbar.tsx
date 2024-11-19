import React, {useEffect, useState} from "react";
import iconSearch from "../../images/icon-search.svg";
import d from "../../constant/constant"
import useInputHook from "../../hooks/useInputHook";
import {NavLink, useNavigate} from "react-router-dom";
import BurgerMenu from "../../images/burger-menu-svgrepo-com.svg";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";


function Navbar() {



    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axiosInstance.post("/auth/logout")
        },
        onSuccess: () => {
            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_0)
            navigate("/")
            window.location.reload()
        },
        onError: () => {
            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_0)
        }
    })

    const logoutHandler = () => {
        logoutMutation.mutate()
    }

    const [isLogin, setIsLogin] = useState<boolean>(() => {
        return localStorage.getItem(d.lStorageKey.STATUS_LOGIN_KEY) === "1"
    });

    useEffect(() => {

    }, [isLogin, setIsLogin]);

    const {
        isInputFocused,
        isRemainingText,
        handleFocus,
        handleBlur,
        handleChange,
    } = useInputHook();

    const navigate = useNavigate();

    return (
        <div
            className="font-satoshi shadow-xl bg-[#d2f8d0] flex flew-row gap-2 sm:gap-8 justify-between items-center text-xl fixed top-0 left-0 right-0 z-20  px-8 py-4">
            <div className="logo">
                {/* <img
          src={FimLogo}
          alt="fimLogo"
        /> */}
                <div className="FiMSolutionn text-3xl font-bold">Logo</div>
            </div>

            <div
                className="navbarWrapper text-base sm:text-sm lg:text-lg max-lg:hidden max-[1140px]:hidden flex flew-row gap-0 lg:gap-8 ">
                <NavLink
                    to={""}
                    className={({isActive, isPending}) =>
                        isActive ? "text-teal-500 font-bold" : isPending ? "" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to={"/fim-score"}
                    className={({isActive, isPending}) =>
                        isActive ? "text-teal-500 font-bold" : isPending ? "" : ""
                    }
                >
                    FiMscore
                </NavLink>
                <NavLink
                    to={"/about"}
                    className={({isActive, isPending}) =>
                        isActive ? "text-teal-500 font-bold" : isPending ? "" : ""
                    }
                >
                    About Us
                </NavLink>
                <NavLink
                    to={"/help"}
                    className={({isActive, isPending}) =>
                        isActive ? "text-teal-500 font-bold" : isPending ? "" : ""
                    }
                >
                    Help
                </NavLink>
                <NavLink
                    to={"/my-loan"}
                    className={({isActive, isPending}) =>
                        isActive ? "text-teal-500 font-bold" : isPending ? "" : ""
                    }
                >
                    <p className="bg-yellow-500 rounded px-2 text-white">My Loan</p>
                </NavLink>
            </div>

            <button>
                <img
                    className="min-[1140px]:hidden h-8 w-8"
                    src={BurgerMenu}
                    alt="burger-menu"
                />
            </button>

            <div
                className="max-lg:hidden max-[1140px]:hidden nav-search-box flex flex-row items-center justify-between  w-[430px]">
                <div className="inputBox-with-search-icon relative flex flex-row items-center">
                    <div className="bg-white w-[300px] h-[45px] absolute rounded-md"></div>


                    <div className="nav-search-and-text flex flex-row  absolute items-center gap-2 px-2">
                        {!isInputFocused && !isRemainingText && (
                            <>
                                <img
                                    className="h-[24px]"
                                    src={iconSearch}
                                    alt="navSearchIcon"
                                />
                                <div className="nav-search-text">Search</div>
                            </>
                        )}
                    </div>

                    <input
                        className="w-[300px] h-[45px] rounded-md absolute outline-none px-2 bg-transparent"
                        type="text"
                        title="search-input"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </div>

                {/*Handle login or logout button*/}
                {
                    isLogin ?
                        (
                            <button
                                onClick={logoutHandler}
                                className="login w-[100px] bg-white  flex flex-row items-center justify-center h-[45px] rounded-md"
                            >
                                <div className="">Logout</div>
                            </button>
                        ) :
                        (
                            <button
                                onClick={() => navigate("/login")}
                                className="login w-[100px] bg-white  flex flex-row items-center justify-center h-[45px] rounded-md"
                            >
                                <div className="">Login</div>
                            </button>
                        )
                }
            </div>
        </div>
    );
}

export default Navbar;
