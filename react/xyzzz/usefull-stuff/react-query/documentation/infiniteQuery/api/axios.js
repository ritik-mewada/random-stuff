import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostPage = async (pageparam = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageparam}`, options);
  return response.data;
};
