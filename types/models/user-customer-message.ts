export interface IUserCustomerMessage {
    id: string;
    date: string;
    file: string | null;
    text: string;
    employee_id: string | null;
    customer_id: string | null;
    request_id: string;
    user_name: string | null;
    user_email: string | null;
}