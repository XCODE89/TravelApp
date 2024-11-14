import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/register/registerSlice';
import authReducer from "../features/auth/authSlice"
import tripsReducer from "../features/trips/tripSlice"
import bookingsReducer from "../features/bookings/bookingSlice"
import { listenerMiddleware } from '../middleware/listenerMiddleware';


export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        trips: tripsReducer,
        bookings: bookingsReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
