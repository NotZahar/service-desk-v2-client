export interface IRequest {
    id: string;
    controller_id: string;
    executor_id: string;
    priority_id: string;
    description: string;
    file: string | null;
    agreement: string | null;
    date: Date;
    appeal_id: string | null;
    theme: string;
    type_id: string;
    planned_date: Date;
    status_id: string;
    customer_id: string;
    finish_date: Date;
}