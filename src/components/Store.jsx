import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './UserSlice';
import cartReducer from './CartSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with custom middleware to handle non-serializable values
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
