export const app = {
    baseApiUrl: `${process.env.API_ENDPOINT}`,
    auth: {
        API_AUTH_LOGIN: "/auth/login",
        API_AUTH_REGISTER: "/auth/register",
        API_AUTH_REFRESH: "/auth/refreshToken",
    },

    f2f: {
        loan: {
            currentLoanUser: "/f2f/loan/current-loan"

        },
        payment: {
            last4Payments: "/f2f/payments/current-user/last-4-payments",
        }
    }
};


