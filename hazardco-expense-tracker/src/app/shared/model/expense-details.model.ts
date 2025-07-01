export type ExpenseRequest = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

export type ExpenseDetails = ExpenseRequest & {
  id: string;
};

export type ExpenseApiSuccessPayload = {
  statusCode: number;
  statusMessage: string;
  data: ExpenseDetails | ExpenseDetails[];
};

export type ExpenseApiErrorPayload = {
  statusCode: number;
  statusMessage: string;
};
