import { createAction, createReducer } from "@reduxjs/toolkit";

export interface Tree {
    label:string,
    duration:number,
    dateCreated:number
}

const initialState = [] satisfies Tree[] as Tree[]

export const newTree = createAction<Tree>('tree/newtree')

export const treeReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(newTree, (state, action) => {
            state.push(action.payload)
        })
})
