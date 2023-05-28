export interface IUserInnerMessage {
    id: string;
    date: string;
    file: string | null;
    text: string;
    employee_id: string;
    request_id: string;
    user_name: string | null;
    user_email: string | null;
}