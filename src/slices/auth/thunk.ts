import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabaseList, login } from '../../api/backend_helper';
import { saveSession } from '../../storage';
import { DatabaseListPayload, LoginPayload } from '../../types/auth';

export const fetchDatabaseList = createAsyncThunk(
    'database/fetchDatabaseList',
    async (payload: DatabaseListPayload, { rejectWithValue }) => {
        try {
            const response = await getDatabaseList(payload);
            return response.data.result || [];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch database list');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await login(credentials);
            saveSession(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);
