import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-spend-audit-6inw.onrender.com',
});

export const saveAudit = async (auditData) => {
  const response = await API.post('/api/audits', auditData);
  return response.data;
};

export const getAudit = async (publicId) => {
  const response = await API.get(`/api/audits/${publicId}`);
  return response.data;
};

export const getAuditSummary = async (publicId) => {
  const response = await API.post(`/api/audits/${publicId}/summary`);
  return response.data;
};

export const saveLead = async (leadData) => {
  const response = await API.post('/api/leads', leadData);
  return response.data;
};

export default API;
