
import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import addTaskreducer from "./Reducers/addTaskReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from "redux-thunk";


const allReducer = combineReducers({
    addTaskreducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const middlewares = [thunk, logger];

const composeEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = createStore(persistedReducer, undefined, composeEnhancers);


export default store;
export const persistor = persistStore(store);