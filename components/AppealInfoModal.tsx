import { AppealErrorMessage } from "@/errors/appeal-errors";
import { IAppeal } from "@/types/models/appeal";
import appealInfoModalCSSVariables from "../styles/components/AppealInfoModal.module.scss";

interface AppealInfoModalProps {
    appealInfo: IAppeal | undefined;
}

const AppealInfoModal: React.FC<AppealInfoModalProps> = ({ appealInfo }) => {
    const dateString = (appealInfo?.date ? new Date(appealInfo?.date).toLocaleString('ru-RU') : AppealErrorMessage.DataProblem);
    const customerData = `${appealInfo?.customer_name} ${appealInfo?.customer_email}`;
    const fileName = appealInfo?.file || 'Отсутствует';

    return (
        <>  
            <div id={ appealInfoModalCSSVariables.appealInfoId }>
                <div id={ appealInfoModalCSSVariables.infoInputs }>
                    <div className={ appealInfoModalCSSVariables.columnClass }>
                        <div className={ appealInfoModalCSSVariables.inputDataClass }>
                            <p>Тема</p>
                            <input title={ appealInfo?.theme } defaultValue={ appealInfo?.theme } type="text" readOnly />
                        </div>
                        <div className={ appealInfoModalCSSVariables.inputDataClass }>
                            <p>Статус</p>
                            <input defaultValue={ appealInfo?.status_name } type="text" readOnly />
                        </div>
                        <div className={ appealInfoModalCSSVariables.inputDataClass }>
                            <p>Клиент</p>
                            <input title={ customerData } defaultValue={ customerData } type="text" readOnly />
                        </div>
                    </div>
                    <div className={ appealInfoModalCSSVariables.columnClass }>
                        <div className={ appealInfoModalCSSVariables.inputDataClass }>
                            <p>Дата регистрации</p>
                            <input defaultValue={ dateString } type="text" readOnly />
                        </div>
                        <div className={ appealInfoModalCSSVariables.inputDataClass }>
                            <p>Файл</p>
                            <input defaultValue={ fileName } type="text" readOnly />
                        </div>
                    </div>
                </div>
                <div id={ appealInfoModalCSSVariables.infoTextarea }>
                    <p>Описание обращения</p>
                    <textarea defaultValue={ appealInfo?.text } readOnly></textarea>
                </div>
            </div>
        </>
    );
};

export default AppealInfoModal;