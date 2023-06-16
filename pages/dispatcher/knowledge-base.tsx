import KnowledgeBaseFileSystem from "@/components/KnowledgeBaseFileSystem";
import Modal from "@/components/Modal";
import NewFileModal from "@/components/NewFileModal";
import { baseServerPath } from "@/helpers/paths";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import kbaseCSSVariables from "../../styles/pages/knowledge-base.module.scss";

const KnowledgeBase = () => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { currentFileKey } = useTypedSelector(state => state.kbaseReducer);

    const fileContentRef = useRef<HTMLTextAreaElement>(null);
    const newFileNameInputRef = useRef<HTMLInputElement>(null);
    const newFileContentTextAreaRef = useRef<HTMLTextAreaElement>(null);

    const [newFileOpened, setNewFileOpened] = useState(false);
    const [newFileErrorsVisible, setNewFileErrorsVisible] = useState(false);
    const [newFileErrorMessages, setNewFileErrorMessages] = useState<string[]>();
    const [refreshTreeTrigger, setRefreshTreeTrigger] = useState(false);

    const createNewFile = async () => {
        try {
            await axios.post(`${baseServerPath}/knowledge-base/file`, {
                folderPath: currentFileKey,
                fileName: ifEmptyToNull(newFileNameInputRef.current?.value),
                content: ifEmptyToNull(newFileContentTextAreaRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });

            setRefreshTreeTrigger(prev => !prev);
            setNewFileOpened(prev => !prev)
        } catch (err) {
            setNewFileErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setNewFileErrorsVisible(true);
        }
    };

    const cancelNewFile = () => {
        setNewFileOpened(prev => !prev)
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ kbaseCSSVariables.mainContentId }>
                    <div id={ kbaseCSSVariables.fileSystemColumnId }>
                        <KnowledgeBaseFileSystem 
                            fileContentRef={ fileContentRef }
                            refreshTreeTrigger={ refreshTreeTrigger } />
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
                            <NewFileModal 
                                nameInputRef={ newFileNameInputRef }
                                contentTextAreaRef={ newFileContentTextAreaRef } />
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