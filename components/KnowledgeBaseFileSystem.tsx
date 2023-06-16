import { KBaseErrorMessage } from "@/errors/kbase-errors";
import { baseServerPath } from "@/helpers/paths";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { kbaseSlice } from "@/store/reducers/KBaseSlice";
import { FileInfoNode } from "@/types/models/file-info-node";
import { Tree } from "antd";
import type { DirectoryTreeProps } from "antd/es/tree";
import { RefObject, useEffect, useState } from "react";
import kbaseCSSVariables from "../styles/components/KnowledgeBaseFileSystem.module.scss";
import Loader from "./Loader";

const { DirectoryTree } = Tree;

interface KnowledgeBaseFileSystemProps {
    fileContentRef: RefObject<HTMLTextAreaElement>;
    refreshTreeTrigger: boolean;
}

const KnowledgeBaseFileSystem: React.FC<KnowledgeBaseFileSystemProps> = ({ fileContentRef, refreshTreeTrigger }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { treeData, error } = useTypedSelector(state => state.kbaseReducer);
    const { setKBaseSuccess, setKBaseError, setKBaseSelectedFile } = kbaseSlice.actions;
    const dispatch = useTypedDispatch();
    
    const [isLoading, setLoading] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/knowledge-base`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setKBaseSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setKBaseError(String(err)));
            setLoading(false);
        });
    }, [refreshTreeTrigger]);
    
    const searchPattern = (data: FileInfoNode[], pattern: string): string[] => {
        let foundKeys: string[] = [];

        const search = (children: FileInfoNode[]) => {
            for (const node of children) {
                const title = node.title as string;
                if (title.toLowerCase().includes(pattern.toLowerCase())) {
                    foundKeys.push(node.key as string);
                }

                if (node.children) search(node.children);
            }
        };

        search(data);

        return foundKeys;
    };

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value) return;
        const foundKeys = searchPattern(treeData, value);
        setExpandedKeys(foundKeys);
        setAutoExpandParent(true);
    };
    
    const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {
        dispatch(setKBaseSelectedFile(keys[0] as string));

        fetch(`${baseServerPath}/knowledge-base/file?path=${keys[0]}`, { 
            headers: { Authorization: token || ''} 
        })
        .then(res => res.json())
        .then(data => {
            if (!fileContentRef.current) return;
            if ('message' in data) { fileContentRef.current.value = data.message; return; }
            if ('data' in data && Array.isArray(data.data)) {
                const decoder = new TextDecoder();
                fileContentRef.current.value = decoder.decode(new Uint8Array(data.data));
            }
        })
        .catch(err => {
            if (fileContentRef.current) fileContentRef.current.value = String(err);
        });
    };

    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${KBaseErrorMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>  
            <input placeholder="Поиск по базе знаний..." type="text" onChange={ onChange } />
            <DirectoryTree
                className={ kbaseCSSVariables.fileSystemClass }
                onSelect={ onSelect }
                onExpand={ onExpand }
                autoExpandParent={ autoExpandParent }
                expandedKeys={ expandedKeys }
                treeData={ treeData } />
        </>
    );
};

export default KnowledgeBaseFileSystem;