import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducers } from "../reducers"

export const store =
process.env.NODE_ENV === 'production'
  ? createStore(rootReducers, applyMiddleware(thunk))
  : createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
