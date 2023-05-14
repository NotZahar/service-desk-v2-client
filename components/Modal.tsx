import useUUID from "@/hooks/useUUID";
import { IInput, IButton } from "@/types/base";
import modalCSSVariables from "../styles/components/Modal.module.scss";

interface ModalProps {
    title?: string;
    inputs?: IInput[];
    buttons?: IButton[];
    show: boolean;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, inputs, buttons, show, children }) => {
    const inputsKeys = useUUID( inputs ? inputs.length : 0 );
    const buttonsKeys = useUUID( buttons ? buttons.length : 0);
    
    return (
        show ?
        <>
            <div id={ modalCSSVariables.modalWindowId }>
                <div id={ modalCSSVariables.modalContentId }>
                    <h3>{ title }</h3>
                    {   inputs ?
                        inputs.map(({ id, className, label }, index) => {
                            return ( 
                                <div key={ inputsKeys[index] }>
                                    <input id={ id } className={ className } type="text" placeholder={ label } />
                                </div>
                            );
                        }) : <></>
                    }

                    {   buttons ?
                        <div id={ modalCSSVariables.buttonsId }>
                            {   buttons.map(({ id, className, text }, index) => {
                                    return <button id={ id } className={ className } key={ buttonsKeys[index] } type="button">{ text }</button>;
                            }) }
                        </div> : <></>
                    }

                    { children }
                </div>
            </div>
        </> : <></>
    );
};

export default Modal;