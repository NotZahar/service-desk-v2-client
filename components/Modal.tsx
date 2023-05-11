import useUUID from "@/hooks/useUUID";
import { IInput, IButton } from "@/types/base";
import { useEffect } from "react";
import CSSVariables from "../styles/components/Modal.module.scss";

interface ModalProps {
    title: string;
    inputs: IInput[];
    buttons: IButton[];
    show: boolean;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, inputs, buttons, show, children }) => {
    const inputsKeys = useUUID(inputs.length);
    const buttonsKeys = useUUID(buttons.length);

    useEffect(() => {
        // TODO: prevent close
        show && (document.getElementById(CSSVariables.dialogWindowId) as HTMLDialogElement).showModal();
    });
    
    return (
        <>
            <dialog id={ CSSVariables.dialogWindowId }> // TODO: change dialog to div
                <>
                    <h3>{ title }</h3>
                    { inputs.map(({ id, className, label }, index) => {
                        return ( 
                            <div key={ inputsKeys[index] }>
                                <label htmlFor={ id }>{ label }</label>
                                <input id={ id } className={ className } type="text" />
                            </div>
                        );
                    }) }

                    { buttons.map(({ id, className, text }, index) => {
                        return <button id={ id } className={ className } key={ buttonsKeys[index] } type="button">{ text }</button>;
                    }) }
                </>
            </dialog>
            { children }
        </>
    );
};

export default Modal;