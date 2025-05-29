import axios from 'axios';

const BASE_URL = 'http://localhost:8000/annotation';

// 📂 Obtenir la liste des classes
export const getClasses = async () => {
  const response = await axios.get(`${BASE_URL}/classes`);
  return response.data;
};

// ➕ Ajouter une classe (en JSON)
export const addClass = async (className) => {
  const response = await axios.post(`${BASE_URL}/classes`, {
    label: className
  });
  return response.data;
};

// ❌ Supprimer une classe
export const deleteClass = async (className) => {
  const response = await axios.delete(`${BASE_URL}/classes/${className}`);
  return response.data;
};

// 🖼️ Annoter des images une par une
export const annotateImages = async (files, labels) => {
  const user_id = 'demo-user';
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const image_name = files[i].name;
    const label = labels[i];

    const payload = {
      image_name,
      label,
      user_id
    };

    const response = await axios.post(`${BASE_URL}/annotate-db`, payload);
    results.push(response.data);
  }

  return {
    message: "Toutes les annotations ont été traitées.",
    results
  };
};

// 📦 Exporter les annotations
export const exportAnnotations = async () => {
  const response = await axios.get(`${BASE_URL}/export`);
  return response.data;
};
