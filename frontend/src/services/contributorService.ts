import { apiClient } from "../api/axiosInstance";
import type { ApiResponse, Contributor } from "../types/index";

export const addContributor = async (formData: Contributor): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.post('/contributors', formData);
    return res.data;
}

export const getContributor = async (contributorId: string): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.get(`/contributors/${contributorId}`);
    return res.data;
}

export const getContributors = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}): Promise<ApiResponse<Contributor[]>> => {
    const queryParams = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value.toString());
            }
        });
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/tasks/?${queryString}` : '/tasks/';

    const res = await apiClient.get(url);
    return res.data;
}

export const markTaskAsComplete = async (taskId: string): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.patch(`/contributors/${taskId}/complete`);
    return res.data;
}

export const updateTask = async (taskId: string, formData: FormData): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.put(`/tasks/${taskId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const deleteTask = async (taskId: string): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.delete(`/contributors/${taskId}`);
    return res.data;
}

export const restoreTask = async (taskId: string): Promise<ApiResponse<Contributor>> => {
    const res = await apiClient.patch(`/contributors/${taskId}/restore`);
    return res.data;
}

export const deleteTaskPermanently = async (taskId: string): Promise<ApiResponse<void>> => {
    const res = await apiClient.delete(`/contributors/${taskId}/permanent`);
    return res.data;
}

export const getDashboardTasksStats = async (): Promise<ApiResponse<{
    total: number,
    pending: number,
    inProgress: number,
    completed: number
}>> => {
    const res = await apiClient.get(`/contributors/dashboard/stats`);
    return res.data;
}

export const getAnalyticsData = async (): Promise<ApiResponse<{
    statusData: { name: string; value: number }[];
    priorityData: { name: string; value: number }[];
    weeklyData: { day: string; completed: number; created: number }[];
    completionRate: number;
    tasksThisWeek: number;
    avgCompletionTime: number;
}>> => {
    const res = await apiClient.get(`/contributors/analytics/data`);
    return res.data;
}

