import {configureStore} from '@reduxjs/toolkit';

import {
    userReducer
} from './Reducers/User.reducer';

import {
    urlReducer,
    createUrlReducer,
    viewUrlReducer,
    deleteUrlReducer
} from './Reducers/Url.reducer';

import {
    analyticsReducer,
    clicksReducer
} from './Reducers/Analytics.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        urls: urlReducer,
        createUrl: createUrlReducer,
        url: viewUrlReducer,
        analytics: analyticsReducer,
        clicks: clicksReducer,
        deleteUrl: deleteUrlReducer
    }
});

export default store;