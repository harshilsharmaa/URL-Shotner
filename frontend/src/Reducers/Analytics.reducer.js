import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const analyticsReducer = createReducer(initialState, {

    GetAnalyticsRequest: (state)=>{
        state.loading = true;
    },
    GetAnalyticsSuccess: (state, action)=>{
        state.loading = false;
        state.analytics = action.payload.analytics;
        state.message = action.payload.message;
        state.status = 'success';
    },
    GetAnalyticsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
})

export const clicksReducer = createReducer(initialState, {
    GetClicksRequest: (state)=>{
        state.loading = true;
    },
    GetClicksSuccess: (state, action)=>{
        state.loading = false;
        state.clicks = action.payload.clicks;
        state.message = action.payload.message;
    },
    GetClicksFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})