import KnowledgeBaseFileSystem from "@/components/KnowledgeBaseFileSystem";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { DataNode } from "antd/es/tree";
import kbaseCSSVariables from "../../styles/pages/knowledge-base.module.scss";

const treeData: DataNode[] = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true }
        ]
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true }
        ]
    }
];

const KnowledgeBase = () => {
    return (
        <>
            <DispatcherLayout>
                <div id={ kbaseCSSVariables.mainContentId }>
                    <div id={ kbaseCSSVariables.fileSystemColumnId }>
                        <input type="text" placeholder="Поиск по базе знаний..." />
                        <KnowledgeBaseFileSystem treeData={ treeData } />
                    </div>
                    <div id={ kbaseCSSVariables.workColumnId }>
                        <div id={ kbaseCSSVariables.topPanelId }>
                            <button type="button">Создать файл</button>
                            <button type="button">Создать раздел</button>
                        </div>
                        <div id={ kbaseCSSVariables.fileContentId }>
                            <textarea readOnly></textarea>
                        </div>
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default KnowledgeBase;