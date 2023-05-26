export enum RequestType {
    INCIDENT = 'Инцидент', 
    INTERNAL = 'Внутренняя',
    SERVICE = 'Обслуживание'
}

export type requestType = keyof typeof RequestType;
