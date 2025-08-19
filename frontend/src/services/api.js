import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple retry on timeout/network errors to ride out cold starts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};
    const isNetworkOrTimeout = error.code === 'ECONNABORTED' || !error.response;
    if (isNetworkOrTimeout) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      if (config.__retryCount <= 2) {
        await new Promise((r) => setTimeout(r, 1000 * config.__retryCount));
        return api(config);
      }
    }
    return Promise.reject(error);
  }
);

const handleApiResponse = (response) => {
  if (response.data?.success) {
    return response.data;
  }
  throw new Error(response.data?.error || 'API request failed');
};

const handleApiError = (error) => {
  console.error('API Error:', error.message);
  throw new Error(error.response?.data?.error || error.message || 'Network error');
};

export const chatAPI = {
  async getConversations() {
    try {
      const response = await api.get(API_ENDPOINTS.CONVERSATIONS);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getMessages(wa_id) {
    try {
      const response = await api.get(`${API_ENDPOINTS.MESSAGES}?wa_id=${wa_id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async sendMessage(messageData) {
    try {
      const response = await api.post(API_ENDPOINTS.MESSAGES, messageData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async updateMessageStatus(messageId, status) {
    try {
      const response = await api.put(`${API_ENDPOINTS.MESSAGES}/${messageId}/status`, { status });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async processPayloads() {
    try {
      const response = await api.post(API_ENDPOINTS.PROCESS_PAYLOADS);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async deleteMessage(messageId) {
    try {
      const response = await api.delete(`${API_ENDPOINTS.DELETE_MESSAGE}/${messageId}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async deleteConversation(waId) {
    try {
      const response = await api.delete(`${API_ENDPOINTS.DELETE_CONVERSATION}/${waId}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${BASE_URL}/api/webhook/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // Longer timeout for file uploads
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};