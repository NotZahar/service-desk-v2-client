import { RefObject } from "react";
import newRequestModalCSSVariables from "../styles/components/NewRequestModal.module.scss";

interface NewAppealModalProps {
    themeInputRef: RefObject<HTMLInputElement>;
    descriptionInputRef: RefObject<HTMLTextAreaElement>;
}

const NewAppealModal: React.FC<NewAppealModalProps> = ({ 
        themeInputRef,
        descriptionInputRef
    }) => {

    return (
        <>  
            <div id={ newRequestModalCSSVariables.newRequestId }>
                <div id={ newRequestModalCSSVariables.newRequestInputs }>
                    <div className={ newRequestModalCSSVariables.columnClass }>
                        <div className={ `${newRequestModalCSSVariables.inputDataClass} ${newRequestModalCSSVariables.inputDataClassWide}` }>
                            <p>Тема</p>
                            <input ref={ themeInputRef } type="text" />
                        </div>
                        <div className={ `${newRequestModalCSSVariables.inputDataClass} ${newRequestModalCSSVariables.inputDataClassWide}` }>
                            <p>Файл</p>
                            <button type="button">Прикрепить</button>
                        </div>
                    </div>
                </div>
                <div id={ newRequestModalCSSVariables.newRequestTextarea }>
                    <p>Описание обращения</p>
                    <textarea ref={ descriptionInputRef }></textarea>
                </div>
            </div>
        </>
    );
};

export default NewAppealModal;