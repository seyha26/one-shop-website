import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import productsSlice from "./features/productsSlice";
const rootReducer = combineReducers({
    auth: authSlice,
    products: productsSlice
})
const store = configureStore({ reducer: rootReducer});

export default store;