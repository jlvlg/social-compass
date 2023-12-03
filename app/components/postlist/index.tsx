import { Post } from "@util/types";
import PostComponent from "../postcomponent";
import styles from "./postlist.module.scss";

export type Props = { posts: Post[]; className?: string };

function PostList({ posts, className }: Props) {
  return (
    <ul className={`${styles.list} ${className}`}>
      {posts.map((p) => (
        <li key={p.id}>
          <PostComponent post={p} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;
