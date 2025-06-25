import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTeacherDashboard } from '../../api/backend_helper';

export const fetchTeacherDashboard = createAsyncThunk(
    'dashboard/fetchTeacherDashboard',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await getTeacherDashboard({ jsonrpc: 2.0, params: {} });
            return response.data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch teacher dashboard');
        }
    }
);
