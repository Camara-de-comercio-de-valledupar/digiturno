import axios from 'axios';

const BASE_URL = ' '; // dentro de la '' colocar la URL de la API

export const fetchCases = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createCase = async (subject: string, observation: string) => {
  const response = await axios.post(BASE_URL, { subject, observation });
  return response.data;
};

export const deleteCase = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return true;
};

export const fetchCaseHistory = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}/history`);
  return response.data;
};
