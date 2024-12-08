import React from 'react';
import {FaFacebookMessenger, FaLine, FaTelegram} from "react-icons/fa";
import {MdOutlineEmail} from 'react-icons/md';

const Footer = () => {
    return (
        <>
            <>

                <footer className="relative pt-8 pb-6">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap text-left lg:text-left">
                            <div className="w-full lg:w-6/12">
                                <h4 className="text-[24px] ">Let's keep in touch!</h4>
                                <h5 className=" md:text-[17px] mt-0 mb-2 ">
                                    Find us on any of these platforms, we respond 1-2 business days.
                                </h5>
                                <div className="mt-6 lg:mb-0 mb-6 flex flex-row">
                                    <button
                                        className="bg-white  shadow-lg  h-10 w-10 flex items-center justify-center  rounded-full  mr-2"
                                        type="button">
                                        <FaLine className="text-green-600"/>
                                    </button>
                                    <button
                                        className="bg-white  shadow-lg  h-10 w-10 flex items-center justify-center  rounded-full  mr-2"
                                        type="button">
                                        <FaFacebookMessenger className="text-blue-500"/>
                                    </button>
                                    <button
                                        className="bg-white  shadow-lg  h-10 w-10 flex items-center justify-center  rounded-full  mr-2"
                                        type="button">
                                        <MdOutlineEmail className="text-amber-900"/>
                                    </button>
                                    <button
                                        className="bg-white  shadow-lg  h-10 w-10 flex items-center justify-center  rounded-full  mr-2"
                                        type="button">
                                        <FaTelegram className="text-teal-950"/>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full lg:w-4/12 px-4 ml-auto">
                                        <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">About
                                                    Us</a>
                                            </li>
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Blog</a>
                                            </li>
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Github</a>
                                            </li>
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Free
                                                    Products</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                        <ul className="list-unstyled">

                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Terms &amp; Conditions</a>
                                            </li>
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Privacy
                                                    Policy</a>
                                            </li>
                                            <li>
                                                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                   href="#">Contact
                                                    Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-blueGray-300"/>
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                                <a href="#" className="text-sm text-blueGray-500 font-semibold py-1">
                                    Copyright © <span id="get-current-year">2021 Raksmey by FiMsolution Team.</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        </>
    )
};

export default Footer;