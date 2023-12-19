import { configureStore } from '@reduxjs/toolkit';
import { serviceReducer } from './serviceSlice';

export const store = configureStore({ reducer: { service: serviceReducer } });