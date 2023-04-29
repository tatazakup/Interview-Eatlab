import { applyMiddleware, createStore, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
)

export default store