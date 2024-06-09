// src/components/UserSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId) => {
    const response = await fetch(`http://localhost:5000/signupdata/${userId}`);
    const data = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: '',
    username: '',
    phone: '',
    address: '',
    picture: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setPicture: (state, action) => {
      state.picture = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setPicture } = userSlice.actions;
export default userSlice.reducer;
