import {configureStore} from '@reduxjs/toolkit';

import {
    userReducer,
    loginUserReducer
} from './Reducers/User.reducer';

import {
    urlReducer,
    createUrlReducer,
    viewUrlReducer,
    deleteUrlReducer,
    createGroupReducer,
    getAllGroupsReducer,
    getGroupReducer,
    deleteGroupReducer
} from './Reducers/Url.reducer';

import {
    analyticsReducer,
    clicksReducer,
    urlAnalyticsReducer,
    groupAnalyticsReducer
} from './Reducers/Analytics.reducer';

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
        deleteGroup: deleteGroupReducer
    }
});

export default store;