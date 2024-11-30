import React, {useEffect, useState} from "react";
import iconSearch from "../../images/icon-search.svg";
import d from "../../constant/constant"
import useInputHook from "../../hooks/useInputHook";
import {NavLink, useNavigate} from "react-router-dom";
import BurgerMenu from "../../images/burger-menu-svgrepo-com.svg";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {MdClear} from "react-icons/md";
import anime from "animejs/lib/anime.es.js";

const burgerInit: {
    burgerKey: "burgerKey",
    value: "0" | "1"
} = {
    burgerKey: "burgerKey",
    value: "0"
}

function Navbar() {


    const [isClickBur, setIsClickBur] = useState<boolean>(() => {
        const value = localStorage.getItem(burgerInit.burgerKey);
        return value === "1";
    })

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

    useEffect(() => {
        console.log("Burger is clicked: ", isClickBur)
    }, [isClickBur])

    // useEffect(() => {
    //     // Animate dropdown menu opening
    //     gsap.to('.nav-menu', {height: isClickBur ? '0' : 'auto', opacity: isClickBur ? 0 : 1, duration: 0.5});
    // }, [isClickBur])

    const handleOnClickBur = () => {
        const value = localStorage.getItem(burgerInit.burgerKey);

        console.log("Burger is clicked: ", value)
        // Animate dropdown menu closing
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

                        <button onClick={handleOnClickBur}>
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
                )
            }


            {/*    if isClickBur == true*/}
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
    );
}

export default Navbar;
