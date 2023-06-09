import { useTypedSelector } from "@/hooks/redux";
import requestInfoImmutableCSSVariables from "../styles/components/RequestInfoImmutable.module.scss";

interface RequestInfoImmutableProps {
    isNotForCustomer?: boolean;
}

const RequestInfoImmutable: React.FC<RequestInfoImmutableProps> = ({ isNotForCustomer = true }) => {
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    
    return (
        <>
            <div id={ requestInfoImmutableCSSVariables.mainLayoutId }>
                <h2 title={ currentRequest?.theme }>{ currentRequest?.theme }</h2>
                <div id={ requestInfoImmutableCSSVariables.infoId }>
                    {   isNotForCustomer &&
                        <div className={ requestInfoImmutableCSSVariables.infoDataClass }>
                            <p className={ requestInfoImmutableCSSVariables.fieldNameClass }>Клиент:</p>
                            <p title={ currentRequest?.customer_email } >{ `${currentRequest?.customer_name} ${currentRequest?.customer_email}` }</p>
                        </div>
                    }
                    <div className={ requestInfoImmutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoImmutableCSSVariables.fieldNameClass }>Договор:</p>
                        <p>{ currentRequest?.agreement || '(Отсутствует)' }</p>
                    </div>
                    <div className={ requestInfoImmutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoImmutableCSSVariables.fieldNameClass }>Обращение:</p>
                        <p>{ currentRequest?.appeal_id || '(Отсутствует)' }</p>
                    </div>
                    {   isNotForCustomer &&
                        <div className={ requestInfoImmutableCSSVariables.infoDataClass }>
                            <p className={ requestInfoImmutableCSSVariables.fieldNameClass }>Файл:</p>
                            <p>{ currentRequest?.file || '(Отсутствует)' }</p>
                        </div>
                    }
                </div>
                {   isNotForCustomer && 
                    <div id={ requestInfoImmutableCSSVariables.descriptionId }>
                        <p className={ requestInfoImmutableCSSVariables.fieldNameClass }>Описание:</p>
                        <textarea defaultValue={ currentRequest?.description } readOnly></textarea>
                    </div>
                }
            </div>
        </>
    );
};

export default RequestInfoImmutable;