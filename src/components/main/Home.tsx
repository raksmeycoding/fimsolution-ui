import React from 'react';
import PlayerSVG from "../../images/play.svg";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        // bg-amber-500
        // Wrapper section
        <>
            {/* <HomeLandingPageSectionOne /> */}
            {/* <HomeLandingGetStartSection /> */}

            {/* Section 1 */}
            <>
                {/* Where the clip path is */}

                <div
                    className="half-ellipse2 half-ellipse font-satoshi flex flex-col gap-4 justify-center items-center text-center">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                        FiMsolution
                    </h1>
                    <div className="flex text-base sm:text-lg md:text-xl flex-col justify-center items-center">
                        <p>Financial Management</p>
                        {/* <p>Solution</p> */}
                        <p>Designed to create your future</p>
                    </div>
                </div>

                {/* relative left-0 right-0 top-0 h-[900px] */}
                {/* <div className=""> */}
                {/* Remove Background Image */}
                {/* <img
          className="absolute top-0 left-0 right-0 z-0 "
          src={BgNavWavBackground}
          alt=""
        /> */}
                {/* absolute z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-[400px] */}

                {/* </div> */}

                {/* -translate-x-1/2 -translate-y-1/2 left-1/2 absolute top-[650px] z-10 w-[1200px] */}
                <div className="global_config w-12/12 mx-auto px-2 mt-12 sm:w-10/12 md:w-9/12 lg:8/12 ">
                    <div
                        className="font-satoshi drop-shadow-xl tracking-wider text-base sm:text-lg md:text-xl text-center">
                        Lending to friends and family is a difficult decision to make and
                        often ends in the loss of not only money, but relationships. This is
                        why we are creating FiMloans, an online service that will make
                        lending money to friends and family easy, safe, and rewarding.
                        Through our platform, lenders will be able offer loans with fair
                        interest rates, while borrowers increase their credit score with
                        every on-time payment.
                    </div>
                </div>

                {/* Section 2 */}
                {/* px-2 sm:w-10/12 md:w-9/12 lg:8/12 */}
                <div className="global_config w-12/12 mx-auto   mt-12">
                    <div
                        className="font-satoshi bg-[#f6f7f8] h-[200px] py-4 sm:h-[300px] flex flex-col items-center justify-center   drop-shadow-md ">
                        <img
                            className="h-8 sm:h-10"
                            src={PlayerSVG}
                            alt="getStartPlayerSVG"
                        />
                        <h3 className="getStartText text-xl sm:text-2xl md:text-3xl font-medium text-center mt-2">
                            Get Started
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-center leading-relaxed mt-2">
                            Aenean consectetur odio in condimentum tristique.
                        </p>

                        <div className="button-login-and-signup flex flex-row gap-8 mt-2">
                            <Link to="/signup">
                                <button className="w-[80px] sm:w-[110px] h-8 sm:h-10 rounded-md bg-black text-white">
                                    Sign Up
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="w-[80px] sm:w-[110px] h-8  sm:h-10 rounded-md border border-black">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default Home;