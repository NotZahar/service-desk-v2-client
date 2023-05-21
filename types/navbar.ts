import { MouseEventHandler, RefObject } from "react";

export type tab = 
    'Заявки'
    | 'Клиенты'
    | 'Сотрудники'
    | 'База знаний'
    | 'Статистика'

export type tabPath = 
    'requests'
    | 'customers'
    | 'employees'
    | 'knowledge-base'
    | 'stats'

export interface ITab {
    id?: string;
    tab: tab;
    path: tabPath;
    onClick?: MouseEventHandler<HTMLDivElement>;
    ref?: RefObject<HTMLDivElement>;
}