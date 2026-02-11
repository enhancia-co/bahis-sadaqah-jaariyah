import { apiClient } from "../api/axiosInstance";
import type { ApiResponse, Collection } from "../types/index";

export const addCollection = async (formData: Collection): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.post('/collections', formData);
    return res.data;
}

export const getCollection = async (collectionId: string): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.get(`/collections/${collectionId}`);
    return res.data;
}

export const getCollections = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}): Promise<ApiResponse<Collection[]>> => {
    const queryParams = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value.toString());
            }
        });
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/collections/?${queryString}` : '/collections/';

    const res = await apiClient.get(url);
    return res.data;
}

export const markCollectionAsComplete = async (collectionId: string): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.patch(`/collections/${collectionId}/complete`);
    return res.data;
}

export const updateCollection = async (collectionId: string, formData: Collection): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.put(`/collections/${collectionId}`, formData);
    return res.data;
}

export const deleteCollection = async (collectionId: string): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.delete(`/collections/${collectionId}`);
    return res.data;
}

export const restoreCollection = async (collectionId: string): Promise<ApiResponse<Collection>> => {
    const res = await apiClient.patch(`/collections/${collectionId}/restore`);
    return res.data;
}

export const deleteCollectionPermanently = async (collectionId: string): Promise<ApiResponse<void>> => {
    const res = await apiClient.delete(`/collections/${collectionId}/permanent`);
    return res.data;
}

export const getDashboardCollectionsStats = async (): Promise<ApiResponse<{
    total: number,
    pending: number,
    inProgress: number,
    completed: number
}>> => {
    const res = await apiClient.get(`/collections/dashboard/stats`);
    return res.data;
}

export const getAnalyticsData = async (): Promise<ApiResponse<{
    statusData: { name: string; value: number }[];
    priorityData: { name: string; value: number }[];
    weeklyData: { day: string; completed: number; created: number }[];
    completionRate: number;
    collectionsThisWeek: number;
    avgCompletionTime: number;
}>> => {
    const res = await apiClient.get(`/collections/analytics/data`);
    return res.data;
}