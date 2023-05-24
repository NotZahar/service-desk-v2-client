import { IAppealStatus } from "./appeal-status";

export interface IAppeal {
    id: string;
    theme: string;
    text: string;
    file: string | null;
    customer_id: string;
    date: Date;
    status: IAppealStatus;
}