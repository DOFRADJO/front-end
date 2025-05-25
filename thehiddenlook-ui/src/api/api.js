import axios from 'axios';

const BASE_URL = 'http://localhost:8001'; // annotation_service direct

// 📂 Obtenir la liste des classes
export const getClasses = async () => {
  const response = await axios.get(`${BASE_URL}/classes`);
  return response.data;
};

// ➕ Ajouter une classe
export const addClass = async (className) => {
  const formData = new FormData();
  formData.append('class_name', className);
  const response = await axios.post(`${BASE_URL}/classes`, formData);
  return response.data;
};

// ❌ Supprimer une classe
export const deleteClass = async (className) => {
  const response = await axios.delete(`${BASE_URL}/classes/${className}`);
  return response.data;
};

// 🖼️ Annoter des images (avec MongoDB)
export const annotateImages = async (files, labels) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  labels.forEach(label => formData.append('labels', label));

  const response = await axios.post(`${BASE_URL}/annotate-db`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// 📦 Exporter les annotations
export const exportAnnotations = async () => {
  const response = await axios.get(`${BASE_URL}/export`);
  return response.data;
};
