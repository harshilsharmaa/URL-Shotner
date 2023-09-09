import {configureStore} from '@reduxjs/toolkit';

import {
    userReducer,
    loginUserReducer,
    urlsLimitReducer
} from './Reducers/User.reducer';

import {
    urlReducer,
    createUrlReducer,
    viewUrlReducer,
    deleteUrlReducer,
    createGroupReducer,
    getAllGroupsReducer,
    getGroupReducer,
    deleteGroupReducer,
    editUrlReducer
} from './Reducers/Url.reducer';

import {
    analyticsReducer,
    clicksReducer,
    urlAnalyticsReducer,
    groupAnalyticsReducer,
    urlReportReducer
} from './Reducers/Analytics.reducer';

import {
    paymentReducer
} from './Reducers/Payment.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        urls: urlReducer,
        createUrl: createUrlReducer,
        url: viewUrlReducer,
        analytics: analyticsReducer,
        clicks: clicksReducer,
        deleteUrl: deleteUrlReducer,
        urlAnalytics: urlAnalyticsReducer,
        groupAnalytics: groupAnalyticsReducer,
        createGroup: createGroupReducer,
        allGroups: getAllGroupsReducer,
        loginUser: loginUserReducer,
        groupById: getGroupReducer,
        deleteGroup: deleteGroupReducer,
        updatedUrl: editUrlReducer,
        urlsLimit: urlsLimitReducer,
        order: paymentReducer,
        reportUrl: urlReportReducer
    }
});

export default store;