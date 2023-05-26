export interface IEmployee {
    id: string;
    email: string;
    role_id: string;
    first_name: string;
    second_name: string;
    patronymic: string | null;
    phone_number: string | null;
    department: string;
    appointment: string;
    role_name: string;
}