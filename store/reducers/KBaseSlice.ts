import { FileInfoNode } from "@/types/models/file-info-node";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KBaseState {
    treeData: FileInfoNode[];
    error: string;
}

const initialState: KBaseState = {
    treeData: [],
    error: ''
};

export const kbaseSlice = createSlice({
    name: 'kbase',
    initialState,
    reducers: {
        setKBaseSuccess(state, action: PayloadAction<FileInfoNode[]>) {
            state.treeData = action.payload;
            state.error = '';
        },
        setKBaseError(state, action: PayloadAction<string>) {
            state.treeData = [];
            state.error = action.payload;
        },
        resetKBase(state) {
            state.treeData = [];
            state.error = '';
        }
    }
})

export default kbaseSlice.reducer;