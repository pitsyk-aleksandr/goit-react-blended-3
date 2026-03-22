import axios from "axios";
import { Post, PostFormData } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText: string, page: number) => {
  const responce = await axios.get(`/posts`, {
    params: {
      q: searchText,
      _page: page,
      _limit: 10,
    },
  });
  return responce.data;
};

export const createPost = async (newPost: PostFormData) => {
  const responce = await axios.post(`/posts`, newPost);
  return responce.data;
};

export const editPost = async (newDataPost: Post) => {
  const responce = await axios.put(`/posts/${newDataPost.id}`, newDataPost);
  return responce.data;
};

export const deletePost = async (postId: number) => {
  const responce = await axios.delete(`/posts/${postId}`);
  return responce.data;
};
