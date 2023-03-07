import { createStore,combineReducers } from "redux";

import bookReducer from "./reducers/booksReducer";
import categoriesReducer from "./reducers/categoriesReducer";   

const rootReducer=combineReducers({
    bookState: bookReducer,
    categoriesState: categoriesReducer
})

const store= createStore(rootReducer)

export default store