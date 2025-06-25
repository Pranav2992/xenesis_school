import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDatabaseList, loginUser } from './thunk';

interface InitialState {
    list: string[];
    loading: boolean;
    error: string | null;
    user: any | null;
    isAuthenticated: boolean;
    loginLoading: boolean;
    loginError: string | null;
}

const initialState: InitialState = {
    list: [],
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    loginLoading: false,
    loginError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loginError = null;
        },
        clearLoginError: (state) => {
            state.loginError = null;
        },
    },
    extraReducers: builder => {
        builder
            // Database list cases
            .addCase(fetchDatabaseList.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDatabaseList.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchDatabaseList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Login cases
            .addCase(loginUser.pending, state => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload as string;
            });
    },
});

export const { logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
