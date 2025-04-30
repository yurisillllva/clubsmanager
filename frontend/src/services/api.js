import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

export const getClubs = async (page = 1, search = '') => {
  const response = await api.get('/clubs', { params: { page, search } });
  return response.data; 
};
  
export const getClubById = (id) => api.get(`/clubs/${id}`);

export const createClub = (clubData) => api.post('/clubs', clubData);

export const updateClub = (id, clubData) => api.put(`/clubs/${id}`, clubData);

export const deleteClub = async (id) => api.delete(`/clubs/${id}`);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || 'Erro desconhecido';
    return Promise.reject(new Error(errorMessage));
  }
);