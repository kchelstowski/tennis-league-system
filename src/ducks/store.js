import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import { entities } from './entities/reducers';
import errorReducer from "./entities/error";
import successReducer from "./entities/success";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    entities: entities,
    error: errorReducer,
    success: successReducer
});

const store = createStore(combinedReducers,
    composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger)),
);

export default store;