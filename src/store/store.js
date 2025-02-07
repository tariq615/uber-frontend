import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import roleSlice from "./roleAuthSlice";
import userAuthSlice from "./userAuthSlice";
import captainAuthSlice from "./captainAuthSlice";

// Persist configuration for the role reducer
const rolePersistConfig = {
  key: "role",
  storage,
};

// Wrap the roleSlice with persistReducer
const persistedRoleReducer = persistReducer(rolePersistConfig, roleSlice);

// Combine reducers
const rootReducer = combineReducers({
  role: persistedRoleReducer, // Persisted reducer
  userAuth: userAuthSlice, // Non-persisted
  captainAuth: captainAuthSlice, // Non-persisted
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
