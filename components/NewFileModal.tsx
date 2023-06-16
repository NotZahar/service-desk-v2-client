import { RefObject } from "react";
import newRequestModalCSSVariables from "../styles/components/NewRequestModal.module.scss";

interface NewFileModalProps {
    nameInputRef: RefObject<HTMLInputElement>;
    contentTextAreaRef: RefObject<HTMLTextAreaElement>;
}

const NewFileModal: React.FC<NewFileModalProps> = ({ nameInputRef, contentTextAreaRef }) => {
    return (
        <>  
            <div id={ newRequestModalCSSVariables.newRequestId }>
                <div id={ newRequestModalCSSVariables.newRequestInputs }>
                    <div className={ newRequestModalCSSVariables.columnClass }>
                        <div className={ `${newRequestModalCSSVariables.inputDataClass} ${newRequestModalCSSVariables.inputDataClassWide}` }>
                            <p>Название</p>
                            <input ref={ nameInputRef } type="text" />
                        </div>
                    </div>
                </div>
                <div id={ newRequestModalCSSVariables.newRequestTextarea }>
                    <p>Содержание файла</p>
                    <textarea ref={ contentTextAreaRef }></textarea>
                </div>
            </div>
        </>
    );
};

export default NewFileModal;