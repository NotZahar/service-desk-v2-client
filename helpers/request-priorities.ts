export enum RequestPriority {
    HIGH = 'Высокий',
    MEDIUM = 'Средний',
    LOW = 'Низкий'
}

export type requestPriority = keyof typeof RequestPriority;