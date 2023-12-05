import { Post } from "@util/types";
import Card from "../card";
import PostComponent from "../postcomponent";
import styles from "./postlist.module.scss";

export type Props = { posts?: Post[]; className?: string };

function PostList({ posts, className }: Props) {
  return posts?.length ? (
    <ul className={`${styles.list} ${className}`}>
      {posts
        .toSorted(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((p) => (
          <li key={p.id}>
            <PostComponent post={p} />
          </li>
        ))}
    </ul>
  ) : (
    <Card className={`${styles.list} ${styles.empty}`}>Nenhum post ainda</Card>
  );
}

export default PostList;
