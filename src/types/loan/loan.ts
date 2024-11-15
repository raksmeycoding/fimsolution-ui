export type USER_ROLE = "LENDER" | "BORROWER" | "PROXY";
export type USER_TYPE = "INFO" | "ACCESS" | "DECIDE" | "TEAM";
export type USER_PRIORITY = "DEFAULT" | "NONE_DEFAULT";

export interface LoanUserReqDto {
    userId: string;
    loanId: string;
    loanName?: string;
    role?: USER_ROLE;
    type?: USER_TYPE;
    prioritize?: USER_PRIORITY;
    memo?: string;
    email?: string;
}


export interface LoanUserResDto {
    loan?: {
        id?: string
    },
    user?: {
        id?: string
    },
    loanName?: string;
    role?: USER_ROLE;
    type?: USER_TYPE;
    prioritize?: USER_PRIORITY;
    memo?: string;
    email?: string;
}