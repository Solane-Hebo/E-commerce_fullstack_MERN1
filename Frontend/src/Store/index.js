import { configureStore } from "@reduxjs/toolkit"
import ProductListSlice from './ProductSlice'
import shoppingCartReducer from "./CartSlice"
import userReducer from "./userSlice"
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const store = configureStore({
  reducer: {
    productList: ProductListSlice,
    shoppingCart: shoppingCartReducer,  
    user: userReducer,
  },
})
