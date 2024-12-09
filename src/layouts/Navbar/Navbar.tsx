import React, {useEffect, useState} from "react";
import iconSearch from "../../images/icon-search.svg";
import d from "../../constant/constant"
import {NavLink, useNavigate} from "react-router-dom";
import BurgerMenu from "../../images/burger-menu-svgrepo-com.svg";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {MdClear} from "react-icons/md";
import anime from "animejs/lib/anime.es.js";
import useLoanLists from "../../hooks/useLoanLists";
import useVerifyUserSession from "../../hooks/useVerifyUserSession";

const burgerInit: {
    burgerKey: "burgerKey",
    value: "0" | "1"
} = {
    burgerKey: "burgerKey",
    value: "0"
}

function Navbar() {

    const {data: sessionData} = useVerifyUserSession();

    const {data: loanListData, error: loanListError} = useLoanLists();

    useEffect(() => {
    }, [loanListData, loanListError]);


    const [isClickBur, setIsClickBur] = useState<boolean>(() => {
        const value = localStorage.getItem(burgerInit.burgerKey);
        return value === "1";
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axiosInstance.post("/v1/auth/logout")
        },
        onSuccess: () => {
            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_0)
            navigate("/")
            window.location.reload()
        },
        onError: () => {
            localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_0)
            window.location.reload()
        }
    })


    const handleOnClickBur = () => {
        const value = localStorage.getItem(burgerInit.burgerKey);

        setIsClickBur((prevState) => {
            if (value === "0" || value === null) {
                localStorage.setItem(burgerInit.burgerKey, "1")
                return !prevState;
            }
            if (value === "1") {
                localStorage.setItem(burgerInit.burgerKey, "0")
                return !prevState;
            }

            return false;
        })


    }
    const logoutHandler = () => {
        logoutMutation.mutate()

    }

    const [isLogin] = useState<boolean>(() => {
        return localStorage.getItem(d.lStorageKey.STATUS_LOGIN_KEY) === "1"
    });


    const navigate = useNavigate();


    // Animate the dropdown menu
    useEffect(() => {

        if (isClickBur) {
            anime({
                targets: '.nav-menu',
                opacity: [0, 1],  // Transition opacity from 0 to 1
                // translateY: ['-50px', '0'], // Transition translateY (slide from -50px to 0)
                // easing: 'easeInOutQuad', // Easing function to make the transition smooth
                translateX: ['-100%', '0%'], // Move the element from off-screen left (-100%) to its original position (0%)
                easing: 'easeOutQuad', // Easing function for smooth transition
                duration: 1000, // Duration of the animation (in ms)
            });
        } else {
            anime({
                targets: '.nav-menu',
                opacity: [0, 0],  // Transition opacity from 0 to 1
                // translateY: ['-50px', '0'], // Transition translateY (slide from -50px to 0)
                // easing: 'easeInOutQuad', // Easing function to make the transition smooth
                translateX: ['-100%', '0%'], // Move the element from off-screen left (-100%) to its original position (0%)
                easing: 'easeOutQuad', // Easing function for smooth transition
                duration: 1000, // Duration of the animation (in ms)
            });
        }

    }, [isClickBur]);


    const handleAutoCloseBurger = () => {
        setIsClickBur(false);
        localStorage.setItem(burgerInit.burgerKey, "0");
    }


    return (
        <>
            {
                !isClickBur && (
                    <div className="bg-[#d2f8d0]">

                        <div className="shadow-md relative">

                            <div
                                className="container mx-auto py-2 font-satoshi  flex flex-rown w-full justify-between items-center relative ">
                                <div className="FiMSolutionn text-3xl font-bold ">Logo</div>


                                <div
                                    className="navbarWrapper text-base sm:text-sm lg:text-lg max-lg:hidden max-[1140px]:hidden flex flew-row gap-0 lg:gap-2 items-center absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                    <NavLink
                                        to={""}
                                        className={({isActive, isPending}) =>
                                            isActive ? "mx-2 py-1 border-b-2 border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300 text-teal-700 font-bold" : isPending ? "" : " px-2 py-1 transition ease-in-out delay-150 hover:scale-110 duration-300  "
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={"/fim-score"}
                                        className={({isActive, isPending}) =>
                                            isActive ? "mx-2 py-1 border-b-2 border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300 text-teal-700 font-bold" : isPending ? "" : " px-2 py-1 transition ease-in-out delay-150 hover:scale-110 duration-300  "
                                        }
                                    >
                                        FiMscore
                                    </NavLink>
                                    <NavLink
                                        to={"/about"}
                                        className={({isActive, isPending}) =>
                                            isActive ? "mx-2 py-1 border-b-2 border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300 text-teal-700 font-bold" : isPending ? "" : " px-2 py-1 transition ease-in-out delay-150 hover:scale-110 duration-300  "
                                        }
                                    >
                                        FiMguide
                                    </NavLink>
                                    <NavLink
                                        to={"/help"}
                                        className={({isActive, isPending}) =>
                                            isActive ? "mx-2 py-1 border-b-2 border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300 text-teal-700 font-bold" : isPending ? "" : " px-2 py-1 transition ease-in-out delay-150 hover:scale-110 duration-300  "
                                        }
                                    >
                                        FiMloan
                                    </NavLink>


                                    {
                                        sessionData && (sessionData?.admin || sessionData?.registerUser) && (
                                            <>
                                                <NavLink
                                                    to={"/my-loan"}
                                                    className={({isActive, isPending}) =>
                                                        isActive ? "mx-2    shadow-inner shadow-teal-800 rounded-2xl border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300  " : isPending ? "" : " border-teal-800 border-2 rounded-2xl transition ease-in-out  hover:scale-110 duration-300 "
                                                    }
                                                >
                                                    <span
                                                        className="font-bold  text-teal-800 rounded-2xl px-2 py-1 border-teal-800">My Loan</span>
                                                </NavLink>

                                            </>
                                        )

                                        // : (
                                        //     <>
                                        //
                                        //         <button
                                        //             disabled={true}
                                        //             className="px-1 cursor-not-allowed font-bold text-gray-400 bg-gray-200 shadow-inner rounded ">
                                        //             <span>My Loan</span>
                                        //         </button>
                                        //
                                        //
                                        //     </>
                                        // )

                                    }

                                    {
                                        sessionData && sessionData?.admin && (
                                            <>
                                                <NavLink
                                                    to={"/dash/create-user"}
                                                    className={({isActive, isPending}) =>
                                                        isActive ? "mx-2 py-1 border-b-2 border-teal-800 transition ease-in-out delay-150 hover:scale-110 duration-300 text-teal-700 font-bold" : isPending ? "" : " px-2 py-1 transition ease-in-out delay-150 hover:scale-110 duration-300  "
                                                    }
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </>
                                        )
                                    }


                                </div>

                                <button className="min-[1140px]:hidden h-8 w-8" onClick={handleOnClickBur}>
                                    <img
                                        src={BurgerMenu}
                                        alt="burger-menu"
                                    />
                                </button>


                                <div
                                    className="max-lg:hidden max-[1140px]:hidden nav-search-box flex flex-row items-center justify-end gap-4  w-[430px] ">
                                    <div className="inputBox-with-search-icon relative flex flex-row items-center ">
                                        <button className="cursor-pointer">
                                            <img
                                                className="h-[24px] hover:h-[28px] duration-300"
                                                src={iconSearch}
                                                alt="navSearchIcon"
                                            />
                                        </button>
                                    </div>

                                    {
                                        isLogin ?
                                            (
                                                <button
                                                    onClick={logoutHandler}
                                                    className="login w-[100px] bg-white hover:shadow-xl hover:duration-300   flex flex-row items-center justify-center h-[36px] rounded-md"
                                                >
                                                    <div
                                                        className="hover:font-bold hover:scale-110 duration-300 transition ease-in-out">Logout
                                                    </div>
                                                </button>
                                            ) :
                                            (
                                                <>
                                                    <button onClick={() => navigate("/login")}
                                                    >
                                                        <div
                                                            className="hover:font-bold hover:scale-110 duration-300 transition ease-in-out">Log
                                                            in
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate("/signup")}
                                                        className="login w-[100px] bg-teal-800 hover:shadow-xl hover:duration-300    flex flex-row items-center justify-center h-[36px] rounded-3xl"
                                                    >
                                                        <div
                                                            className="hover:font-bold hover:scale-110 duration-300 transition ease-in-out text-white">Sign
                                                            up
                                                        </div>
                                                    </button>
                                                </>
                                            )
                                    }
                                </div>
                            </div>

                        </div>


                        {/*<input*/}
                        {/*    className="w-[300px] h-[45px] rounded-md absolute outline-none px-2 bg-transparent hover:shadow-xl duration-300 "*/}
                        {/*    type="text"*/}
                        {/*    title="search-input"*/}
                        {/*    onFocus={handleFocus}*/}
                        {/*    onBlur={handleBlur}*/}
                        {/*    onChange={handleChange}*/}
                        {/*/>*/}

                    </div>
                )
            }


            {/*    if isClickBur == true*/
            }
            {
                isClickBur && (
                    <>


                        <div
                            className="sticky top-0 left-0 right-0 z-20 font-satoshi shadow-xl bg-[#d2f8d0] px-4 ">
                            <div
                                className="main-wrapper    flex flex-col items-center justify-between w-full gap-4 pb-4 pt-4">

                                <div className="self-start px-4 flex flex-row justify-between  w-full items-center">
                                    <div className="text-3xl font-bold">Logo</div>

                                    <button onClick={handleOnClickBur}>
                                        <div
                                            className="min-[1140px]:hidde">
                                            <MdClear className="h-8 w-8"/>
                                        </div>
                                    </button>
                                </div>


                                <NavLink
                                    to={"/"}
                                    className={({isActive, isPending}) =>
                                        isActive ? "text-teal-500 self-start px-4 font-semibold nav-menu" : isPending ? "" : "self-start px-4 font-semibold nav-menu"
                                    }
                                >
                                    <button onClick={handleAutoCloseBurger}>Home</button>
                                </NavLink>
                                <NavLink
                                    to={"/fim-score"}
                                    className={({isActive, isPending}) =>
                                        isActive ? "text-teal-500 self-start px-4 font-semibold nav-menu" : isPending ? "" : "self-start px-4 font-semibold nav-menu"
                                    }
                                >
                                    <button onClick={handleAutoCloseBurger}>FiMscore</button>
                                </NavLink>
                                <NavLink
                                    to={"/about"}
                                    className={({isActive, isPending}) =>
                                        isActive ? "text-teal-500 self-start px-4 font-semibold nav-menu" : isPending ? "" : "self-start px-4 font-semibold nav-menu"
                                    }
                                >
                                    <button onClick={handleAutoCloseBurger}>About Us</button>
                                </NavLink>
                                <NavLink
                                    to={"/help"}
                                    className={({isActive, isPending}) =>
                                        isActive ? "text-teal-500 self-start px-4 font-semibold nav-menu" : isPending ? "" : "self-start px-4 font-semibold nav-menu"
                                    }
                                >
                                    <button onClick={handleAutoCloseBurger}>Help</button>
                                </NavLink>
                                <NavLink
                                    to={"/my-loan"}
                                    className={({isActive, isPending}) =>
                                        isActive ? "text-teal-500 self-start px-4 font-semibold nav-menu" : isPending ? "" : "self-start px-4 font-semibold nav-menu"
                                    }
                                >
                                    <button onClick={handleAutoCloseBurger}>My Loan</button>
                                </NavLink>

                            </div>
                        </div>

                    </>
                )
            }

        </>
    )
        ;
}

export default Navbar;
