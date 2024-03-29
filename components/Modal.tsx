import useUUID from "@/hooks/useUUID";
import { IInput, IButton, IError } from "@/types/base";
import modalCSSVariables from "../styles/components/Modal.module.scss";

interface ModalProps {
    title?: string;
    inputs?: IInput[];
    buttons?: IButton[];
    errors?: IError[];
    widthFitContent?: boolean;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, inputs, buttons, errors, widthFitContent, children }) => {
    const inputsKeys = useUUID( inputs ? inputs.length : 0 );
    const buttonsKeys = useUUID( buttons ? buttons.length : 0);
    const errorsKeys = useUUID( errors ? errors.length : 0);
    
    return (
        <>
            <div id={ modalCSSVariables.modalWindowId }>
                <div id={ modalCSSVariables.modalContentId } className={ widthFitContent ? modalCSSVariables.modalContentWidthFitContent : modalCSSVariables.modalContentWidthDefault }>
                    <h3>{ title }</h3>
                    {   inputs &&
                        <div id={ modalCSSVariables.inputsId }>
                            {   inputs.map(({ id, className, label, type, ref }, index) => {
                                    return ( 
                                        <div key={ inputsKeys[index] }>
                                            <input id={ id } className={ className } placeholder={ label } ref={ ref } type={ type } />
                                        </div>
                                    );
                                }) 
                            }
                        </div>
                    }

                    {   errors &&
                        <div id={ modalCSSVariables.errorsId }>
                            {   errors.map(({ id, className, text, ref }, index) => {
                                    return <p id={ id } className={ className } key={ errorsKeys[index] } ref={ ref } >{ text }</p>;
                                })
                            }
                        </div>
                    }

                    { children }

                    {   buttons &&
                        <div id={ modalCSSVariables.buttonsId }>
                            {   buttons.map(({ id, className, text, onClick, ref }, index) => {
                                    return <button id={ id } className={ className } key={ buttonsKeys[index] } onClick={ onClick } ref={ ref } type="button">{ text }</button>;
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Modal;