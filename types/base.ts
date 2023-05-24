import { MouseEventHandler, RefObject } from "react";

export interface IInput {
    id?: string;
    className?: string;
    label: string;
    type?: string;
    ref?: RefObject<HTMLInputElement>;
}

export interface IButton {
    id?: string;
    className?: string;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ref?: RefObject<HTMLButtonElement>;
}

export interface IError {
    id?: string;
    className?: string;
    text: string;
    ref?: RefObject<HTMLParagraphElement>;
}

export interface IOption {
    title: string;
    value: string;
    selected?: boolean;
}

export interface ISelect {
    id?: string;
    className?: string;
    options: IOption[];
}