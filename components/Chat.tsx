import { useTypedSelector } from "@/hooks/redux";
import Image from "next/image";
import { MouseEventHandler, RefObject, useEffect, useRef } from "react";
import chatCSSVariables from "../styles/components/Chat.module.scss";

export type chatType = 'customer' | 'inner';

interface ChatProps {
    chatName: string;
    type: chatType;
    textfieldRef: RefObject<HTMLTextAreaElement>;
    updateMessages: boolean;
    sendHandler?: MouseEventHandler<HTMLImageElement>;
    attachFileHandler?: MouseEventHandler<HTMLImageElement>;
}

const Chat: React.FC<ChatProps> = ({ chatName, textfieldRef, updateMessages, sendHandler, attachFileHandler, type }) => {         
    const { userCustomerMessages } = useTypedSelector(state => state.userCustomerMessagesReducer);
    const { userInnerMessages } = useTypedSelector(state => state.userInnerMessagesReducer);
    
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatBodyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [updateMessages]);

    return (
        <>
            <div id={ chatCSSVariables.mainLayoutId }>
                <div id={ chatCSSVariables.chatNameId }>
                    <p>{ chatName }</p>
                </div>
                <div id={ chatCSSVariables.chatBodyId } >
                    {   type === 'customer' && Array.isArray(userCustomerMessages) &&
                        userCustomerMessages.map((message) => {
                            return (
                                <div className={ chatCSSVariables.messageClass } key={ message.id } >
                                    <div className={ chatCSSVariables.metaInfoClass }>
                                        <p>{ `${message.user_name} ${message.user_email}` }</p>
                                        <p>{ new Date(message.date).toLocaleString('ru-RU') }</p>
                                        <p>{ message.file }</p>
                                    </div>
                                    <p>{ message.text }</p>
                                </div>
                            );
                        })
                    }
                    {   type === 'inner' && Array.isArray(userInnerMessages) &&
                        userInnerMessages.map((message) => {
                            return (
                                <div className={ chatCSSVariables.messageClass } key={ message.id } >
                                    <div className={ chatCSSVariables.metaInfoClass }>
                                        <p>{ `${message.user_name} ${message.user_email}` }</p>
                                        <p>{ new Date(message.date).toLocaleString('ru-RU') }</p>
                                        <p>{ message.file }</p>
                                    </div>
                                    <p>{ message.text }</p>
                                </div>
                            );
                        })
                    }
                    <div ref={ chatBodyRef }></div>
                </div>
                <div id={ chatCSSVariables.inputMessageId }>
                    <textarea ref={ textfieldRef } placeholder="Введите сообщение..."></textarea>
                    <div id={ chatCSSVariables.inputMessageBtnsId }>
                        <Image 
                            src="/send.png"
                            alt="Send"
                            width={ +chatCSSVariables.sendImgWidth }
                            height={ +chatCSSVariables.sendImgHeight }
                            onClick={ sendHandler } />                        
                        <Image
                            src="/attach.png"
                            alt="Attach"
                            width={ +chatCSSVariables.attachImgWidth }
                            height={ +chatCSSVariables.attachImgHeight }
                            onClick={ attachFileHandler } />                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;