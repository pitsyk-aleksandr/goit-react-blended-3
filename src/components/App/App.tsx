import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";

import { fetchPosts } from "../../services/postService";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editedPost, setEditedPost] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],

    queryFn: async () => {
      const { posts, totalPosts } = await fetchPosts(searchQuery, currentPage);
      setTotalPages(Math.ceil(totalPosts / 10));
      setTotalPosts(totalPosts);
      return posts;
    },
    placeholderData: keepPreviousData,
  });

  // ------------------------------------------------------------------------------------
  // Використовуємо useEffect для відстеження змін в даних
  // та виклику toast-повідомлення, якщо масив нотаток порожній
  useEffect(() => {
    // Якщо в результаті запиту масив нотаток порожній, виводимо повідомлення:
    if (data && data.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);
  // -------------------------------------------------------------------------------------

  const handleChangeQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Скидаємо поточну сторінку на 1 при зміні пошукового запиту
  }, 1000);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleChangeQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button}>Create post</button>
      </header>
      {/*isModalOpnen && {<Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal>} */}
      {data && data.length > 0 && <PostList posts={data} />}
      <Toaster />
    </div>
  );
}
