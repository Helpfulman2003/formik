import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./orderSlice";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["user"],
  blacklist: ["product"],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};

// export const store = configureStore({
//     reducer: {
//       user: userReducer  // Khai báo 1 slide tên là user với giá trị là userReducer được export ở file userSlice
//       // Có thể khai báo nhiều slide khác tương tự
//     }
//   });
