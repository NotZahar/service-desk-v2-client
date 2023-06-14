import { Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import kbaseCSSVariables from "../styles/components/KnowledgeBaseFileSystem.module.scss";

const { DirectoryTree } = Tree;

interface KnowledgeBaseFileSystemProps {
    treeData: DataNode[];
}

const KnowledgeBaseFileSystem: React.FC<KnowledgeBaseFileSystemProps> = ({ treeData }) => {
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };
    
    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <>  
            <DirectoryTree
                className={ kbaseCSSVariables.fileSystemClass }
                onSelect={ onSelect }
                onExpand={ onExpand }
                treeData={ treeData } />
        </>
    );
};

export default KnowledgeBaseFileSystem;