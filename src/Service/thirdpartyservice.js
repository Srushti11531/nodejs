const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// GET
const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

// POST
const createPost = async (data) => {
  const res = await axios.post(`${BASE_URL}/posts`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

// PUT
const updatePost = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/posts/${id}`, data);
  return res.data;
};

// DELETE
const deletePost = async (id) => {
  const res = await axios.delete(`${BASE_URL}/posts/${id}`);
  return { message:` Post ${id} deleted`, status: res.status };
};

module.exports = {
  getUsers,
  createPost,
  updatePost,
  deletePost
};