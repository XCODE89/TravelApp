import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    token?: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const authResponse = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            
            if (!authResponse.ok) {
                const error= await authResponse.json()
                return rejectWithValue(error.message);
            }
            
            const authData = await authResponse.json();
            return authData;
        } catch (error) {
            return rejectWithValue('Failed to login');
        }
    }
);

export const fetchAuthenticatedUser = createAsyncThunk<User, string, { rejectValue: string }>(
    'auth/fetchAuthenticatedUser',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/authenticated-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                const error= await response.json()
                return rejectWithValue(error.message);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch authenticated user');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Failed to login';
            })
            .addCase(fetchAuthenticatedUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthenticatedUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthenticatedUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Failed to fetch authenticated user';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
