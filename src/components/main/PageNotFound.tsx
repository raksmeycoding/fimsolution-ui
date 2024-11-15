import React, {useEffect} from "react";
import BgNavWavBackground from "../../images/page-not-found.svg";
import {Link} from "react-router-dom";


function PageNotFound() {

    return (
        <>
            <div
                className="min-w-screen min-h-screen bg-[#f6feff] flex items-center p-5 lg:p-20 overflow-hidden relative">
                <div
                    className="flex-1 min-h-full min-w-full rounded-3xl bg-[#d2f8d0] shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                    <div className="w-full md:w-1/2">
                        <div className="">
                            {/* Logo */}
                            <div className="logo text-5xl font-bold tracking-wider ">
                                LOGO
                            </div>
                        </div>
                        <div className=" text-gray-600 font-light  mt-10">
                            <h1 className="font-black  text-3xl lg:text-5xl text-yellow-500">
                                Page has not been found!
                            </h1>
                        </div>
                        <div className="mt-10">
                            <p>The page you're looking for isn't available.</p>
                            <p>Try searching again or use the Go Back button below.</p>
                        </div>
                        <div className="mt-10">
                            <button
                                className="text-lg font-base bg-white px-2 shadow-md rounded-md outline-none focus:outline-none transform transition-all hover:scale-110  ">
                                <Link
                                    to={"/"}
                                    className="mdi mdi-arrow-left"
                                >
                                    Go Back
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center">
                        <img
                            alt="404Picture"
                            src={BgNavWavBackground}
                        />
                        {/* <a
              href="https://www.freepik.com/vectors/business"
              target="_blank"
              className="text-xs text-gray-300"
            >
              Business vector created by pikisuperstar - www.freepik.com
            </a> */}
                    </div>
                </div>
                <div
                    className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
                <div
                    className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
            </div>
        </>
    );
}

export default PageNotFound;
