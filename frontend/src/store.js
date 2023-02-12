import {configureStore} from '@reduxjs/toolkit';

import {
    userReducer
} from './Reducers/User.reducer';

import {
    urlReducer,
    createUrlReducer,
    viewUrlReducer
} from './Reducers/Url.reducer';

import {
    analyticsReducer
} from './Reducers/Analytics.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        urls: urlReducer,
        createUrl: createUrlReducer,
        url: viewUrlReducer,
        analytics: analyticsReducer
    }
});

export default store;