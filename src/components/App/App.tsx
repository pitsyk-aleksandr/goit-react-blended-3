import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";

import { fetchPosts } from "../../services/postService";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editedPost, setEditedPost] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* {<Pagination />} */}
        <button className={css.button}>Create post</button>
      </header>
      {/* {<Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal>} */}
      <PostList />
      <Toaster />
    </div>
  );
}
