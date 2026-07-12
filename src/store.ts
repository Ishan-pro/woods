import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { treeReducer } from './reducers'

// redux-persist requires a specific storage interface
const customStorage = {
  getItem: (key: string): Promise<string | null> => {
    const value = localStorage.getItem(key)
    return Promise.resolve(value)
  },
  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage: customStorage,
}

const rootReducer = combineReducers({
  trees: treeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
