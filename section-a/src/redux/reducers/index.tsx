import { StoreState } from './types'
import { combineReducers } from "redux"
import todoListReducer from "./todo-list.reducer"
import userReducer from './user.reducer'

export default combineReducers<StoreState.All>({
    todo: todoListReducer,
    user: userReducer
})