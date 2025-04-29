import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

export const getClubs = (page = 1, search = '') => 
  api.get('/clubs', { params: { page, search } });

export const getClubById = (id) => api.get(`/clubs/${id}`);

export const createClub = (clubData) => api.post('/clubs', clubData);

export const updateClub = (id, clubData) => api.put(`/clubs/${id}`, clubData);

export const deleteClub = (id) => api.delete(`/clubs/${id}`);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || 'Erro desconhecido';
    return Promise.reject(new Error(errorMessage));
  }
);