const app = {
    key: {
        ACCESS_TOKEN_KEY: `${process.env.REACT_APP_ACCESS_TOKEN_KEY || "ACCESS_TOKEN_KEY"}`,
        DEFAULT_LOAN_CURRENT_USER_KEY: "DEFAULT_LOAN_CURRENT_USER_KEY",
        LAST_4_PAYMENTS_KEY: "LAST_4_PAYMENTS_KEY",
        API_AUTH_VERIFY_ROLE: "API_AUTH_VERIFY_ROLE",
        user: {
            USER_KEY: "USER_KEY",
        },
        loan: {
            ALL_LOAN_KEY: "ALL_LOAN_KEY",
            ALL_LOAN_USER_KEY: "ALL_LOAN_USER_KEY",
        },
        schedule: {
            ALL_SCHEDULES_KEY: "ALL_SCHEDULES_KEY",
        },
        payment: {
            ALL_PAYMENTS_KEY: "ALL_PAYMENTS_KEY",
        }
    },

    apiUrl: {
        loan: {
            GET_ALL_LOAN: "/f2f/loans",
            POST_A_SINGLE_LOAN: "/f2f/loan",
            GET_ALL_LOAN_USER: "/f2f/loan-users",
            POST_CREATE_LOAN_USER: "/f2f/loan-user",
        },
        schedule: {
            POST_A_SINGLE_SCHEDULE: "/f2f/schedule",
            GET_ALL_SCHEDULES: "/f2f/schedule/all",
        },
        payment: {
            POST_A_SINGLE_PAYMENT: "/f2f/payment",
            ALL_PAYMENTS: "/f2f/payments",
        }
    },

    auth: {
        API_AUTH_LOGIN_URL: "/auth/login",
        API_AUTH_REGISTER_URL: "/auth/register",
        API_AUTH_REFRESH_URL: "/auth/refreshToken",
        API_AUTH_VERIFY_ROLE: "/auth/verify-authority"
    },

    f2f: {
        loan: {
            DEFAULT_LOAN_CURRENT_USER_URL: "/f2f/loan/current-loan",
            ALL_LOAN: "ALL_LOAN",

        },
        payment: {
            LAST_4_PAYMENTS_URL: "/f2f/payments/current-user/last-4-payments",
        },
        user: {
            CREATE_LOAN_CURRENT_USER_URL: "/f2f/user",
            GET_ALL_USER_URL: "/f2f/users/all",
        }
    },

    lStorageKey: {
        STATUS_LOGIN_KEY: "STATUS_LOGIN",
    },

    lStorageValue: {
        STATUS_LOGIN_VALUE_1: "1",
        STATUS_LOGIN_VALUE_0: "0",
    }
}

export default app;







