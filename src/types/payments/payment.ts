export interface ScheduleReqDto {
    id?: string;
    loanId?: string;
    createAt?: string; // ISO 8601 date string
    amount?: string;
    adjustment?: string;
    paid?: string;
    due?: string;
    interest?: string;
    principle?: string;
    fimFee?: string;
    balance?: string;
    source?: string;
    status?: string; // e.g., "FUTURE"
    delinquency?: string; // e.g., "ZERO"
    memo?: string;
}

export interface ScheduleResDto {
    id?: string;
    loanId?: string;
    createAt?: string; // ISO 8601 date string
    amount?: string;
    adjustment?: string;
    paid?: string;
    due?: string;
    interest?: string;
    principle?: string;
    fimFee?: string;
    balance?: string;
    source?: string;
    status?: string; // e.g., "FUTURE"
    delinquency?: string; // e.g., "ZERO"
    memo?: string;
}

export interface PaymentReqDto {
    scheduleId: string;
    loanId: string;
    paymentDate: string;
    createdAt: string;
    amount: string;
    adjust: string
    principle: string;
    fimFee: string;
    receipt: string;
    balance: string;
    type: 'REGULAR' | 'ADJUSTMENT' | 'PENALTY';
    status: 'ON_TIME' | 'DELAYED' | 'PENDING';
    source: 'BORROWER' | 'LENDER';
    memo?: string;
}

export interface PaymentResDto {
    id?: string;
    paymentDate?: string; // ISO 8601 date string
    createdAt?: string; // ISO 8601 date string
    amount?: string;
    adjust?: string;
    principle?: string;
    fimFee?: string;
    receipt?: string;
    balance?: string;
    type?: string; // e.g., "REGULAR"
    status?: string; // e.g., "ON_TIME"
    source?: string; // e.g., "BORROWER"
    memo?: string;
    scheduleResDto?: ScheduleResDto;
}
