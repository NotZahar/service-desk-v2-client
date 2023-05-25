export interface IAppeal {
    id: string;
    theme: string;
    text: string;
    file: string | null;
    customer_id: string;
    date: Date;
    status_id: string;
    status_name: string;
    customer_name: string;
    customer_email: string;
}