import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
// this import knows to look for index .js by default in the given folder
import  {reducers} from "../reducers";

export const store = createStore(
    // TODO add reducers - now done
    reducers,
    // middleware
    compose(
        applyMiddleware(thunk)
    )
)