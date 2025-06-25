import apiClient from "./apiClient";
import * as url from "./apiUrls";

export const login = (data: any) => apiClient.post(url.AUTH, data);
export const getDatabaseList = (data: any) => apiClient.post(url.DATABASELIST, data);
export const getTeacherDashboard = (data: any) => apiClient.post(url.TEACHER_DASHBOARD, data);