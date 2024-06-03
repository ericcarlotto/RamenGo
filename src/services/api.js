const API_URL = 'https://api.tech.redventures.com.br';
const API_KEY = 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf';

const headers = {
  'x-api-key': API_KEY,
};

export const getBroths = async () => {
  const response = await fetch(`${API_URL}/broths`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch broths');
  }
  return response.json();
};

export const getProteins = async () => {
  const response = await fetch(`${API_URL}/proteins`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch proteins');
  }
  return response.json();
};

export const postOrder = async (brothId, proteinId) => {
  const body = JSON.stringify({ "brothId": brothId, "proteinId": proteinId });

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: body
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  return response.json();
};
