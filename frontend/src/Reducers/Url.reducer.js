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

export const createGroupReducer = createReducer(initialState, {
    createGroupRequest: (state)=>{
        state.loading = true;
    },
    createGroupSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload.message;
        state.createdGroup = action.payload.newGroup;
    },
    createGroupFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_CREATED_GROUP: (state)=>{
        state.createdGroup = null;
    }
})

export const getAllGroupsReducer = createReducer(initialState, {
    getAllGroupsRequest: (state)=>{
        state.loading = true;
    },
    getAllGroupsSuccess: (state, action)=>{
        state.loading = false;
        state.allGroups = action.payload.groups;
    },
    getAllGroupsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})

export const getGroupReducer = createReducer(initialState, {
    getGroupByIdRequest: (state)=>{
        state.loading = true;
    },
    getGroupByIdSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload.message;
        state.group = action.payload.group;
    },
    getGroupByIdFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERRORS: (state)=>{
        state.error = null;
    },
    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    }
})

export const deleteGroupReducer = createReducer(initialState, {
    deleteGroupRequest: (state)=>{
        state.loading = true;
    },
    deleteGroupSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload.message;
    },
    deleteGroupFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERRORS: (state)=>{
        state.error = null;
    },
    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    },
    CLEAR_GROUP: (state)=>{
        state.group = null;
    }
})