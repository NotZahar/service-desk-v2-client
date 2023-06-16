import { FileInfoNode } from "@/types/models/file-info-node";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KBaseState {
    treeData: FileInfoNode[];
    currentFileKey: string | undefined;
    error: string;
}

const initialState: KBaseState = {
    treeData: [],
    currentFileKey: undefined,
    error: ''
};

export const kbaseSlice = createSlice({
    name: 'kbase',
    initialState,
    reducers: {
        setKBaseSuccess(state, action: PayloadAction<FileInfoNode[]>) {
            state.treeData = action.payload;
            state.currentFileKey = undefined;
            state.error = '';
        },
        setKBaseError(state, action: PayloadAction<string>) {
            state.treeData = [];
            state.currentFileKey = undefined;
            state.error = action.payload;
        },
        setKBaseSelectedFile(state, action: PayloadAction<string>) {
            state.currentFileKey = action.payload;
        },
        resetKBase(state) {
            state.treeData = [];
            state.currentFileKey = undefined;
            state.error = '';
        }
    }
})

export default kbaseSlice.reducer;