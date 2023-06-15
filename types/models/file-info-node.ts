export interface FileInfoNode { 
    title: string;
    key: string;
    isLeaf?: boolean; 
    children?: FileInfoNode[];
};