const app = {
    key: {
        ACCESS_TOKEN_KEY: `${process.env.REACT_APP_ACCESS_TOKEN_KEY || "ACCESS_TOKEN_KEY"}`,
        DEFAULT_LOAN_CURRENT_USER_KEY: "DEFAULT_LOAN_CURRENT_USER_KEY",
        LOAN_DETAIL_KEY: "LOAN_DETAIL_KEY",
        LAST_4_PAYMENTS_KEY: "LAST_4_PAYMENTS_KEY",
        API_AUTH_VERIFY_ROLE: "API_AUTH_VERIFY_ROLE",
        user: {
            USER_KEY: "USER_KEY",
        },
        loan: {
            ALL_LOAN_KEY: "ALL_LOAN_KEY",
            ALL_LOAN_USER_KEY: "ALL_LOAN_USER_KEY",
            HAVE_DEFAULT_LOAN: "HAVE_DEFAULT_LOAN",
            KEY_LOAN_LIST: "KEY_LOAN_LIST",
        },
        schedule: {
            ALL_SCHEDULES_KEY: "ALL_SCHEDULES_KEY",
            GET_AMOUNT_DUE_FROM_DEFAULT_LOAN_URL: "GET_AMOUNT_DUE_FROM_DEFAULT_LOAN_URL",
            GET_BORROWER_YOU_ARE_SCHEDULE_BOTH_BORROWER_AND_LENDER: 'GET_BORROWER_YOU_ARE_SCHEDULE_BOTH_BORROWER_AND_LENDER',
            GET_PAST_DUE: 'GET_PAST_DUE',
            GET_AMOUNT_DUE_HAS_SOURCE_BORROWER_URL_KEY: "GET_AMOUNT_DUE_HAS_SOURCE_BORROWER_URL_KEY",
            GET_AMOUNT_DUE_HAS_SOURCE_LENDER_URL_KEY: "GET_AMOUNT_DUE_HAS_SOURCE_LENDER_URL_KEY"
        },
        payment: {
            ALL_PAYMENTS_KEY: "ALL_PAYMENTS_KEY",
        },
        session: {
            VERIFY_ROLE_key: "VERIFY_ROLE_KEY",
        }
    },

    apiUrl: {
        loan: {
            GET_ALL_LOAN: "/v1/f2f/loans",
            POST_A_SINGLE_LOAN: "/v1/f2f/loan",
            GET_ALL_LOAN_USER: "/v1/f2f/loan-users",
            POST_CREATE_LOAN_USER: "/v1/f2f/loan-user",
            GET_VERIFY_HAVE_DEFAULT_LOAN: "/v1/verify/default/loan/exist",
        },
        schedule: {
            POST_A_SINGLE_SCHEDULE: "/v1/f2f/schedule",
            GET_ALL_SCHEDULES: "/v1/f2f/schedule/all",
            GET_PAST_DUE: "/v1/f2f/schedule/past-due"

        },
        payment: {
            POST_A_SINGLE_PAYMENT: "/v1/f2f/payment",
            ALL_PAYMENTS: "/v1/f2f/payments",
        }
    },

    auth: {
        API_AUTH_LOGIN_URL: "/v1/auth/login",
        API_AUTH_REGISTER_URL: "/v1/auth/register",
        API_AUTH_REFRESH_URL: "/v1/auth/refreshToken",
        API_AUTH_VERIFY_ROLE: "/v1/auth/verify-authority",
        API_VERIFY_SESSION: "/v1/verify/session"
    },

    f2f: {
        loan: {
            DEFAULT_LOAN_CURRENT_USER_URL: "/v1/f2f/loan/current-loan",
            ALL_LOAN: "ALL_LOAN",
            GET_ALL_LOAN_LISTS_URL: "/v1/f2f/loan-list",
            GET_LOAN_DETAIL_BY_ID_URL: "/v1/f2f/loan",

        },
        payment: {
            LAST_4_PAYMENTS_URL: "/v1/f2f/payments/current-user/last-4-payments",
        },
        user: {
            CREATE_LOAN_CURRENT_USER_URL: "/v1/f2f/user",
            GET_ALL_USER_URL: "/v1/f2f/users/all",
        },
        schedule: {
            GET_AMOUNT_DUE_FROM_DEFAULT_LOAN_URL: "/v2/f2f/schedule/amount-due",
            GET_BORROWER_YOU_ARE_SCHEDULE_BOTH_BORROWER_AND_LENDER: "/v1/f2f/schedule/schedule-to-receive",
            GET_AMOUNT_DUE_HAS_SOURCE_BORROWER_URL: "/v2/f2f/schedule/loan",
            GET_AMOUNT_DUE_HAS_SOURCE_LENDER_URL: "/v2/f2f/schedule/loan",
        },
        session: {
            VERIFY_ROLE: "/v1/verify/session/verify/users",
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







