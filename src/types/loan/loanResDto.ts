// Define the valid loan types as a union of string literals
export type LoanType = "REVOLVING" | "COLLATERAL" | "FIXED";

export interface LoanResDto {
  id: string;
  nickName: string;
  interest: string;
  loanType: LoanType;
  amount: string;
  fee: string;
  note: string;
  createdDate: string;
  endDate: string;
  isLinkToLoanUser: string;
}
