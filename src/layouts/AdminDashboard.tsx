import React from 'react';
import {Outlet} from "react-router";
import {Link, NavLink} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <>
            <div className="text-3xl">
                Dashboard Admin Layout
            </div>
            <ul>
                <ul>
                    <li className="cursor-pointer"><Link to="/dash/create-user">Users</Link></li>
                    <li className="cursor-pointer"><Link to="/dash/create-loan-user">Loan users</Link></li>
                    <li className="cursor-pointer"><Link to="/dash/create-loan">Loans</Link></li>
                    <li className="cursor-pointer"><Link to="/dash/create-schedule">Schedules</Link></li>
                    <li className="cursor-pointer"><Link to="/dash/create-payment">Payments</Link></li>
                </ul>

            </ul>


            <Outlet/>
        </>
    );
};

export default AdminDashboard;