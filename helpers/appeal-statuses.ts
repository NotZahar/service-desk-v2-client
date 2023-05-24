export enum AppealStatus {
    REJECTED = 'Oтклонено',
    AT_WORK = 'В работе',
    OPEN = 'Открыто',
    CLOSED = 'Закрыто'
}

export type appealStatusType = keyof typeof AppealStatus;
