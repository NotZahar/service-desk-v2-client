import { IRole } from "./role";

export interface ICustomer {
    id: string;
    email: string;
    role: IRole;
    first_name: string;
    second_name: string;
    patronymic: string;
    phone_number: string;
    organization: string;
}