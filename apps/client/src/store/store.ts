import { configureStore } from '@reduxjs/toolkit' 
import formReducer from './formSlice' 
import { api } from '../api/baseApi' 

export const store = configureStore({
  reducer: {
    formEditor: formReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) as any,
}) 

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 