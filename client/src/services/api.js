import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL
});

// Interceptor to attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth Services
export const loginApi = (credentials) => API.post('/auth/login', credentials);
export const registerApi = (userData) => API.post('/auth/register', userData);
export const getMeApi = () => API.get('/auth/me');

// Menu Services
export const fetchMenuApi = (params) => API.get('/menu', { params });
export const fetchMenuItemApi = (id) => API.get(`/menu/${id}`);
export const createMenuItemApi = (data) => API.post('/menu', data);
export const updateMenuItemApi = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenuItemApi = (id) => API.delete(`/menu/${id}`);

// Reservation Services
export const createReservationApi = (data) => API.post('/reservations', data);
export const getMyReservationsApi = () => API.get('/reservations/my');
export const getAllReservationsApi = (params) => API.get('/reservations', { params });
export const updateReservationStatusApi = (id, status) => API.put(`/reservations/${id}/status`, { status });
export const deleteReservationApi = (id) => API.delete(`/reservations/${id}`);

// Event Services
export const fetchEventsApi = (params) => API.get('/events', { params });
export const createEventApi = (data) => API.post('/events', data);
export const updateEventApi = (id, data) => API.put(`/events/${id}`, data);
export const deleteEventApi = (id) => API.delete(`/events/${id}`);

// Enquiry Services
export const createEnquiryApi = (data) => API.post('/enquiries', data);
export const fetchEnquiriesApi = (params) => API.get('/enquiries', { params });
export const updateEnquiryStatusApi = (id, status) => API.put(`/enquiries/${id}`, { status });
export const deleteEnquiryApi = (id) => API.delete(`/enquiries/${id}`);

// Admin Stats
export const fetchAdminStatsApi = () => API.get('/admin/dashboard-stats');

// Order Services
export const createOrderApi = (data) => API.post('/orders', data);
export const getMyOrdersApi = () => API.get('/orders/my');
export const getOrderByIdApi = (id) => API.get(`/orders/detail/${id}`);
export const getAllOrdersApi = (params) => API.get('/orders', { params });
export const updateOrderStatusApi = (id, data) => API.put(`/orders/${id}/status`, data);
export const deleteOrderApi = (id) => API.delete(`/orders/${id}`);

export default API;
