import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeacherDashboard } from './thunk';

interface DashboardState {
    loading: boolean;
    error: string | null;
    attendance_rate: number;
    exam_count: number;
    assignment_count: number;
    class_count: number;
    classroom_count: number;
    male_students: number;
    female_students: number;
    total_students: number;
}

const initialState: DashboardState = {
    loading: false,
    error: null,
    attendance_rate: 0,
    exam_count: 0,
    assignment_count: 0,
    class_count: 0,
    classroom_count: 0,
    male_students: 0,
    female_students: 0,
    total_students: 0,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTeacherDashboard.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeacherDashboard.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.attendance_rate = action.payload.attendance_rate;
                state.exam_count = action.payload.exam_count;
                state.assignment_count = action.payload.assignment_count;
                state.class_count = action.payload.class_count;
                state.classroom_count = action.payload.classroom_count;
                state.male_students = action.payload.male_students;
                state.female_students = action.payload.female_students;
                state.total_students = action.payload.total_students;
            })
            .addCase(fetchTeacherDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.attendance_rate = 0;
                state.exam_count = 0;
                state.assignment_count = 0;
                state.class_count = 0;
                state.classroom_count = 0;
                state.male_students = 0;
                state.female_students = 0;
                state.total_students = 0;
            });
    },
});

export default dashboardSlice.reducer;
