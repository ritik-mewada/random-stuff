import axios from "axios";

const baseURL = "http://localhost:4000";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getPosts = () =>
  api
    .get("/posts")
    .then((res) => res.data)
    .catch(() => {
      throw new Error(`error fetching all posts...`);
    });
export const getPost = (id) =>
  api
    .get(`/posts/${id}`)
    .then((res) => res.data)
    .catch(() => {
      throw new Error(`error fetching single post...`);
    });
export const createPost = (data) => api.post("/posts", data);
export const deletePost = (id) =>
  api
    .delete(`/posts/${id}`)
    .then((res) => res.data)
    .catch(() => {
      throw new Error("error deleting post...");
    });
