import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./utils/clients/queryClient";
import AuthProvider from "./contexts/auth/AuthProvider";
import MainLayout from "./layouts/Main/MainLayout";
import Home from "./components/main/Home";
import ProtectRoute from "./components/auth/ProtectRoute";
import TheLoan from "./components/main/TheLoan";
import AdminDashboard from "./layouts/AdminDashboard";
import CreateLoanUser from "./components/admin/CreateLoanUser";
import CreatePayment from "./components/admin/CreatePayment";
import CreateSchedule from "./components/admin/CreateSchedule";
import CreateLoan from "./components/admin/CreateLoan";
import Login from "./components/auth/Login";
import SignUP from "./components/auth/SignUp";
import PageNotFound from "./components/main/PageNotFound";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AdminCreateUser from "./components/admin/AdminCreateUser";
import FimScore from "./components/main/FimScore";
import AboutUs from "./components/main/AboutUs";
import Help from "./components/main/Help";


const App: React.FC = () => (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/fim-score" element={<FimScore/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/help" element={<Help/>}/>
                        <Route path="/my-loan" element={
                            <ProtectRoute
                                allowedRoles={["ROLE_USER", "ROLE_ANNO", "ROLE_LOAN_USER", "ROLE_ADMIN"]}>
                                <TheLoan/>
                            </ProtectRoute>
                        }/>
                    </Route>
                    {/* Admin Route */}
                    {/* AdminDashboard layout and nested routes */}
                    <Route path="/dash" element={
                        <ProtectRoute allowedRoles={["ROLE_ADMIN"]}>
                            <AdminDashboard/>
                        </ProtectRoute>
                    }>
                        <Route index path="create-user" element={<AdminCreateUser/>}/>
                        <Route path="create-loan-user" element={<CreateLoanUser/>}/>
                        <Route path="create-payment" element={<CreatePayment/>}/>
                        <Route path="create-schedule" element={<CreateSchedule/>}/>
                        <Route path="create-loan" element={<CreateLoan/>}/>
                        {/*<Route index element={<DashboardHome/>}/>*/}
                        {/*<Route path="admin" element={<Admin/>}/>*/}
                        {/*<Route path="reports" element={<Reports/>}/>*/}
                        {/*<Route path="user-management" element={<UserManagement/>}/>*/}
                    </Route>


                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUP/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </BrowserRouter>
);


export default App;
