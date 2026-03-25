import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import toast from "react-hot-toast";

import { deletePost } from "../../services/postService";

import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  // toggleModal: () => void;
  // toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts }: PostListProps) {
  const queryClient = useQueryClient();

  const deleteM = useMutation({
    mutationFn: async (postId: number) => {
      const deletedPost = await deletePost(postId);
      console.log("Deleted post:", deletedPost);
    },
    onSuccess: () => {
      toast.success(`Deleted post successfully!`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (postId: number) => {
    deleteM.mutate(postId);
  };

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit}>Edit</button>
            <button className={css.delete} onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
