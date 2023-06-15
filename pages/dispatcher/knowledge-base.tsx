import KnowledgeBaseFileSystem from "@/components/KnowledgeBaseFileSystem";
import Modal from "@/components/Modal";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { useRef, useState } from "react";
import kbaseCSSVariables from "../../styles/pages/knowledge-base.module.scss";

const KnowledgeBase = () => {
    const fileContentRef = useRef<HTMLTextAreaElement>(null);

    const [newFileOpened, setNewFileOpened] = useState(false);
    const [newFileErrorsVisible, setNewFileErrorsVisible] = useState(false);
    const [newFileErrorMessages, setNewFileErrorMessages] = useState<string[]>();

    const createNewFile = () => {
        
    };

    const cancelNewFile = () => {
        setNewFileOpened(prev => !prev)
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ kbaseCSSVariables.mainContentId }>
                    <div id={ kbaseCSSVariables.fileSystemColumnId }>
                        <KnowledgeBaseFileSystem fileContentRef={ fileContentRef } />
                    </div>
                    <div id={ kbaseCSSVariables.workColumnId }>
                        <div id={ kbaseCSSVariables.topPanelId }>
                            <button type="button" onClick={ () => setNewFileOpened(prev => !prev) } >Создать файл</button>
                            <button type="button">Создать раздел</button>
                        </div>
                        <div id={ kbaseCSSVariables.fileContentId }>
                            <textarea ref={ fileContentRef } readOnly></textarea>
                        </div>
                    </div>
                    {   newFileOpened &&
                        <Modal
                            buttons={[
                                { text: 'Создать', onClick: createNewFile },
                                { text: 'Отмена', id: kbaseCSSVariables.cancelBtnId, onClick: cancelNewFile }
                            ]}
                            widthFitContent={ true } >
                            {/* <NewRequestModal 
                                defaultStatus={ defaultStatus }
                                themeInputRef={ themeInputRef }
                                prioritiesSelectRef={ prioritiesSelectRef }
                                statusesSelectRef={ statusesSelectRef }
                                typesSelectRef={ typesSelectRef }
                                customersInputRef={ customersInputRef }
                                contractsInputRef={ contractsInputRef }
                                controllersInputRef={ controllersInputRef }
                                executorsInputRef={ executorsInputRef }
                                plannedDateInputRef={ plannedDateInputRef }
                                descriptionInputRef={ descriptionInputRef } /> */}
                        </Modal>
                    }
                    {   newFileErrorsVisible &&
                            <Modal
                                title="Ошибка!"
                                errors={ newFileErrorMessages && newFileErrorMessages.map((msg) => { return { text: msg }; }) }
                                buttons={[
                                    { text: 'Закрыть', onClick: () => { setNewFileErrorsVisible(prev => !prev) } }
                                ]} />
                    }
                </div>
            </DispatcherLayout>
        </>
    );
};

export default KnowledgeBase;