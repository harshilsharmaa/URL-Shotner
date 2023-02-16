import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const urlReducer = createReducer(initialState, {

    getMyUrlsRequest: (state)=>{
        state.loading = true;
    },
    getMyUrlsSuccess: (state, action)=>{
        state.loading = false;
        state.urls = action.payload.urls;
        state.pageCount = action.payload.pageCount;
        state.message = action.payload.message;
        state.status = 'success';
    },
    getMyUrlsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
})

export const createUrlReducer = createReducer(initialState, {
    createUrlRequest: (state)=>{
        state.loading = true;
    },
    createUrlSuccess: (state, action)=>{
        state.loading = false;
        state.url = action.payload.url;
        state.message = action.payload.message;
        state.status = 'success';
    },
    createUrlFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    }
})

export const viewUrlReducer = createReducer(initialState, {
    viewUrlRequest: (state)=>{
        state.loading = true;
    },
    viewUrlSuccess: (state, action)=>{
        state.loading = false;
        state.url = action.payload.url;
        state.message = action.payload.message;
    },
    viewUrlFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})

export const deleteUrlReducer = createReducer(initialState, {
    deleteUrlRequest: (state)=>{
        state.loading = true;
    },
    deleteUrlSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload.message;
    },
    deleteUrlFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    },
    CLEAR_ERRORS: (state)=>{
        state.error = null;
    }
})