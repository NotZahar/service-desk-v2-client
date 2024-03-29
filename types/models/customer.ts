export interface ICustomer {
    id: string;
    email: string;
    role_id: string;
    first_name: string;
    second_name: string;
    patronymic: string | null;
    phone_number: string | null;
    organization: string | null;
    role_name: string;
}