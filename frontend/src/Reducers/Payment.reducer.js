import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const paymentReducer = createReducer(initialState, {

    checkoutRequest: (state)=>{
        state.loading = true;
    },
    checkoutSuccess: (state, action)=>{
        state.loading = false;
        state.order = action.payload.order;
        state.message = action.payload.message;
    },
    checkoutFailure: (state, action)=>{
        state.loading = false;
        // state.error = action.payload;
    }
})