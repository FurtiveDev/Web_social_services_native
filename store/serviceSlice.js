import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
    service: {},
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServices: (state, { payload }) => {
            console.log('setServices');
            state.services = payload;
        },
        setService: (state, { payload }) => {
            console.log('setService');
            state.service = payload;
        },
        resetService: (state) => {
            console.log('resetService');
            state.service = {};
        },
    },
});

export const serviceReducer = serviceSlice.reducer;

export const { setServices, setService, resetService } = serviceSlice.actions;