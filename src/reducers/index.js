import {combineReducers} from "redux";
import {comment} from "./comment";
import {user} from "./user";

export const reducers = combineReducers({
    comment,
    user
})