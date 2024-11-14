import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBooking } from '../../../interfaces/IBooking';
import { RootState } from '../../store/store';

export interface BookingState {
  bookings: IBooking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  status: 'idle',
  error: null,
};

type NewBooking = {
  tripId: string,
  guests: number,
  date: string,
}

export const fetchBookings = createAsyncThunk<IBooking[], string, { state: RootState }>(
  'bookings/fetchBookings',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch('https://travel-app-api.up.railway.app/api/v1/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data: IBooking[] = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue('Failed to fetch bookings');
    }
  }
);

export const addBooking = createAsyncThunk<IBooking, { token: string; booking: NewBooking }, { state: RootState }>(
  'bookings/addBooking',
  async ({ token, booking }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://travel-app-api.up.railway.app/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });
      if (!response.ok) {
        throw new Error('Failed to add booking');
      }
      const data: IBooking = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue('Failed to add booking');
    }
  }
);

export const deleteBooking = createAsyncThunk<string, { token: string; bookingId: string }, { state: RootState }>(
  'bookings/deleteBooking',
  async ({ token, bookingId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://travel-app-api.up.railway.app/api/v1/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      return bookingId;
    } catch (err) {
      return rejectWithValue('Failed to delete booking');
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<IBooking[]>) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addBooking.fulfilled, (state, action: PayloadAction<IBooking>) => {
        state.bookings.push(action.payload);
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<string>) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
