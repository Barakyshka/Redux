import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk'
import userReducer from './users/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notesReducer from './notes/reducer';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};
const rootReducer = combineReducers({ user: userReducer, notes: notesReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };