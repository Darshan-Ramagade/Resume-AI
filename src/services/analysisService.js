import api from './api';

export const createAnalysis = async (formData) => {
  try {
    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Analysis failed';
  }
};

export const getAnalysisHistory = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/analyze/history?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch history';
  }
};

export const getAnalysisById = async (id) => {
  try {
    const response = await api.get(`/analyze/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch analysis';
  }
};

export const deleteAnalysis = async (id) => {
  try {
    const response = await api.delete(`/analyze/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete analysis';
  }
};

export const getAnalysisStats = async () => {
  try {
    const response = await api.get('/analyze/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch stats';
  }
};