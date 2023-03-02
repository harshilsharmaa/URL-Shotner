import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {

    RegisterRequest: (state)=>{
        state.loading = true;
    },
    RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.status = 'success';
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    LoadUserRequest: (state)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    LogoutRequest: (state)=>{
        state.loading = true;
    },
    LogoutSuccess: (state, action)=>{
        state.loading = false;
        state.user = null;
        state.message = action.payload.message;
        state.status = 'success';
        state.isAuthenticated = false;
    },
    LogoutFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    DeleteAccountRequest: (state)=>{
        state.loading = true;
    },
    DeleteAccountSuccess: (state, action)=>{
        state.loading = false;
        state.user = null;
        state.message = action.payload.message;
        state.isAuthenticated = false;
    },
    DeleteAccountFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    CLEAR_ERRORS: (state)=>{
        state.error = null;
    },
    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    },
    CLEAR_STATUS: (state)=>{
        state.status = null;
    }
})

export const loginUserReducer = createReducer(initialState, {
    LoginRequest: (state)=>{
        state.loading = true;
    },
    LoginSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload.message;
    },
    LoginFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERRORS: (state)=>{
        state.error = null;
    },
    CLEAR_MESSAGES: (state)=>{
        state.message = null;
    },
})