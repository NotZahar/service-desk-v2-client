export enum RequestStatus {
    SUCCESSFULLY_CLOSED = 'Закрыта',
    FAILED = 'Провалена',
    AT_WORK = 'В работе'
}

export type requestStatus = keyof typeof RequestStatus;