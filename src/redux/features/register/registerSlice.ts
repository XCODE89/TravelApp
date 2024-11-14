import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string;
    fullName: string;
    email: string;
    token: string;
}

interface RegisterUserPayload {
    fullName: string;
    email: string;
    password: string;
}

export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk<User, RegisterUserPayload, { rejectValue: string }>(
    'user/register',
    async (userInfo, { rejectWithValue }) => {
        try {
            const registerResponse = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            })
            if (!registerResponse.ok) {
                const error= await registerResponse.json()
                return rejectWithValue(error.message);
            }

            const data: User = await registerResponse.json();

            return data;
        } catch (error) {
            return rejectWithValue('Failed to register user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Unknown error';
            });
    },
});

export default userSlice.reducer;
