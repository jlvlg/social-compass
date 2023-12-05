import Icons from "@assets/icons";
import dayjs from "@util/dates";
import { useToggle } from "@util/hooks";
import { Post } from "@util/types";
import { motion } from "framer-motion";
import Link from "next/link";
import CommentComponent from "../commentComponent";
import CreateComment from "../createcomment";
import Interaction from "../interaction";
import UserImage from "../userimage";
import styles from "./post.module.scss";

export type Props = { post: Post };

function PostComponent({ post }: Props) {
  const [showComments, toggleComments] = useToggle(false);
  const [liked, toggleLiked] = useToggle(false);

  function handleLikes() {
    if (!liked) {
    }
    toggleLiked();
  }

  return (
    <article className={styles.post}>
      <header>
        <Link href={`/profile/${post.author.id}`} className={styles.author}>
          <UserImage user={post.author} className={styles["author-image"]} />
          <div>
            {post.author.name}
            <div className={styles.date}>
              <Icons.clock />
              {dayjs().to(post.createdAt)}
              {post.location && " em "}
              <span>{post.location}</span>
            </div>
          </div>
        </Link>
      </header>
      {post.text}
      {post.image && <img src={post.image} />}
      <div className={styles.interactions}>
        <Interaction
          onClick={toggleLiked}
          icon="like"
          text="Curtiu"
          isActive={liked}
          interactions={+post.likes}
        />
        <Interaction
          onClick={toggleComments}
          icon="comment"
          text="Comentários"
          isActive={showComments}
          interactions={post.comments.length}
        />
        <Interaction icon="share" text="Compartilhar" />
      </div>
      <CreateComment post={post} />
      {post.comments.length > 0 && (
        <section className={styles.comments}>
          <p>Todos os comentários</p>
          <motion.ul
            initial={{ height: 30 }}
            animate={{ height: showComments ? "auto" : 30 }}
          >
            {post.comments.map((c, i) => (
              <li key={"comment" + c.id}>
                <CommentComponent comment={c} />
              </li>
            ))}
          </motion.ul>
          {post.comments.length > 1 && (
            <button
              key="showcomments"
              className={styles["comments-button"]}
              onClick={toggleComments}
            >
              {showComments ? "Esconder" : "Ver todos"} os comentários
            </button>
          )}
        </section>
      )}
    </article>
  );
}

export default PostComponent;
