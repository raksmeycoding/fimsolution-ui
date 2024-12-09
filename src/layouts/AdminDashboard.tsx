import React from 'react';
import {Outlet} from "react-router";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="container mx-auto font-satoshi">
            <div className="container mx-auto text-3xl mt-6 text-[28px] font-semibold overflow-hidden">
                Dashboard Admin Layout
            </div>
            <div className=" h-[900px] flex flex-row font-[17px] w-full mt-6">

                <div className="w-3/12 lg:w-2/12 h-full  shadow-lg">
                    <div className="flex flex-col gap-2 px-4 py-2">
                        <Link to="/dash/create-user">
                            <div className="text-[18px] transition-all ease-in-out hover:pl-2 hover:font-bold hover:scale-105 duration-300">Users</div>
                        </Link>
                        <Link to="/dash/create-loan-user">
                        <div className="text-[18px] transition-all ease-in-out hover:pl-2 hover:font-bold hover:scale-105 duration-300">Loan users</div>
                        </Link>
                        <Link to="/dash/create-loan">
                            <div className="text-[18px] transition-all ease-in-out hover:pl-2 hover:font-bold hover:scale-105 duration-300">Loans</div>
                        </Link>
                        <Link to="/dash/create-schedule">
                            <div className="text-[18px] transition-all ease-in-out hover:pl-2 hover:font-bold hover:scale-105 duration-300">Schedules</div>
                        </Link>
                        <Link to="/dash/create-payment">
                            <div className="text-[18px] transition-all ease-in-out hover:pl-2 hover:font-bold hover:scale-105 duration-300">Payments</div>
                        </Link>
                    </div>
                </div>

                <div className="w-9/12 lg:w-10/12 shadow-lg">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;