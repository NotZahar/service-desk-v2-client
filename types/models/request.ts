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
    controller_name: string;
    controller_email: string;
    controller_appointment: string;
    executor_name: string;
    executor_email: string;
    executor_appointment: string;
    priority_name: string;
    type_name: string;
    status_name: string;
    customer_name: string;
    customer_email: string;
}