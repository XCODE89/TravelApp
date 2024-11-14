import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ITrip } from '../../../interfaces/ITrip';


export interface TripState {
    trips: ITrip[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TripState = {
    trips: [],
    status: 'idle',
    error: null,
};

export const fetchTrips = createAsyncThunk<ITrip[], string, { rejectValue: string }>(
    'trips/fetchTrips',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/trips', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                return rejectWithValue('Failed to fetch trips');
            }
            const data: ITrip[] = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue('Network error occurred');
        }
    }
);

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrips.fulfilled, (state, action: PayloadAction<ITrip[]>) => {
                state.status = 'succeeded';
                state.trips = action.payload;
                state.error = null;
            })
            .addCase(fetchTrips.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Unknown error';
            });
    },
});

export default tripsSlice.reducer;
