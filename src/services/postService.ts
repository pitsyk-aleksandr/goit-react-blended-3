import axios from "axios";
import { Post, PostFormData } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export interface FetchPostsResponse {
  posts: Post[];
  totalPosts: number;
}

export interface PostResponse {
  post: Post;
}

// ======================================================================================
// Функція для отримання постів з сервера з урахуванням пошукового запиту та пагінації
export const fetchPosts = async (searchText: string, page: number) => {
  const responce = await axios.get<FetchPostsResponse>(`/posts`, {
    params: {
      q: searchText,
      _page: page,
      _limit: 10,
    },
  });
  // Кількість постів, які відповідають запиту, можна отримати з заголовка "x-total-count"
  const totalPosts = parseInt(responce.headers["x-total-count"]);
  // Масив постів, які відповідають запиту, знаходиться в тілі відповіді (responce.data)
  const posts = responce.data;
  console.log("responce:", responce);
  console.log("Total posts:", totalPosts);
  console.log("Posts on current page:", posts);

  // Повертаємо об'єкт, який містить масив постів та загальну кількість постів
  return { posts, totalPosts };
};
// ======================================================================================

// ======================================================================================
export const createPost = async (newPost: PostFormData) => {
  const responce = await axios.post(`/posts`, newPost);

  return responce.data;
};
// ======================================================================================

// ======================================================================================
export const editPost = async (newDataPost: Post) => {
  const responce = await axios.put(`/posts/${newDataPost.id}`, newDataPost);
  return responce.data;
};
// ======================================================================================

// ======================================================================================
export const deletePost = async (postId: number) => {
  console.log("deletePost id in function", postId);
  const responce = await axios.delete(`/posts/${postId}`);
  return responce.data;
};
// ======================================================================================
