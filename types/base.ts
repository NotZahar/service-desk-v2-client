import { MouseEventHandler, RefObject } from "react";

export interface IInput {
    id?: string;
    className?: string;
    label: string;
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