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
export const urlAnalyticsReducer = createReducer(initialState, {

    GetUrlAnalyticsRequest: (state)=>{
        state.loading = true;
    },
    GetUrlAnalyticsSuccess: (state, action)=>{
        state.loading = false;
        state.urlAnalytics = action.payload.analytics;
        state.message = action.payload.message;
        state.status = 'success';
    },
    GetUrlAnalyticsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_URL_ANALYTICS: (state)=>{
        state.urlAnalytics = null;
    }
})

export const groupAnalyticsReducer = createReducer(initialState, {
    GetGroupAnalyticsRequest: (state)=>{
        state.loading = true;
    },
    GetGroupAnalyticsSuccess: (state, action)=>{
        state.loading = false;
        state.groupAnalytics = action.payload.analytics;
        state.message = action.payload.message;
    },
    GetGroupAnalyticsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_GROUP_ANALYTICS: (state)=>{
        state.groupAnalytics = null;
    }
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

export const urlReportReducer = createReducer(initialState, {

    GenerateUrlReportRequest: (state)=>{
        state.loading = true;
    },
    GenerateUrlReportSuccess: (state, action)=>{
        state.loading = false;
        state.reportUrl = action.payload.reportUrl;
        state.message = action.payload.message;
    },
    GenerateUrlReportFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    }
})