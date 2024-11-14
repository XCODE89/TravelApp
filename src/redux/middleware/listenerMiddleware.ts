import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginUser, logout } from '../features/auth/authSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: loginUser.rejected,
    effect: (action, listenerApi) => {
      if (action.payload === 'Invalid email or password') {
        listenerApi.dispatch(logout());
      }
    }
  });

