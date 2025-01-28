import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// redux-persist. It configures the persistence of the Redux store state so that it can be saved to a storage medium and rehydrated when the application initializes

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};


// Purpose: Configuration object for redux-persist that specifies how and where to persist the state.
// key: A unique key for the persisted data. root is commonly used for the root reducer.
// storage: Specifies the storage engine to use. In this case, it defaults to localStorage for web applications, as provided by redux-persist/lib/storage.
// version: An optional property to manage different versions of the persisted state. It allows handling migrations or changes to the state structure over time.


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);



// Redux Store: Holds the state of your application and manages state updates through reducers and actions.
// PersistGate: Delays the rendering of your app’s UI until the persisted state has been rehydrated.
// Redux Persist: A library to save and rehydrate the Redux state from persistent storage, ensuring state persistence across sessions.
// Persistor: An object that manages the persistence and rehydration process, ensuring that the state is correctly saved and restored.