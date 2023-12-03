import Icons from "@assets/icons";
import dayjs from "@util/dates";
import { useToggle } from "@util/hooks";
import { Post } from "@util/types";
import { AnimatePresence, motion } from "framer-motion";
import { useImmer } from "use-immer";
import CommentComponent from "../commentComponent";
import CreateComment from "../createcomment";
import Interaction from "../interaction";
import UserImage from "../userimage";
import styles from "./post.module.scss";

export type Props = { post: Post };

function PostComponent({ post }: Props) {
  const [showComments, toggleComments] = useToggle(false);
  const [postState, setPostState] = useImmer(post);
  const [liked, toggleLiked] = useToggle(false);

  function handleLikes() {
    if (!liked) {
    }
    toggleLiked();
  }

  return (
    <div className={styles.post}>
      <div className={styles.author}>
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
      </div>
      {post.text}
      {post.image && <img src={post.image} />}
      <div className={styles.interactions}>
        <Interaction
          onClick={toggleLiked}
          icon="like"
          text="Curtiu"
          interactions={+post.likes}
        />
        <Interaction
          onClick={toggleComments}
          icon="comment"
          text="Comentários"
          interactions={post.comments.length}
        />
        <Interaction icon="share" text="Compartilhar" />
      </div>
      <CreateComment post={post} />
      {post.comments.length > 0 && (
        <>
          <ul className={styles.comments}>
            <AnimatePresence>
              <li key="commentstitle">Todos os comentários</li>
              {post.comments
                .filter((_, i) => showComments || i === 0)
                .map((c, i) => (
                  <motion.li
                    layout
                    variants={{
                      hidden: { height: 0, marginBlock: "-8px" },
                      visible: { height: "auto", marginBlock: 0 },
                    }}
                    style={{ overflow: "hidden" }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={"comment" + c.id}
                  >
                    <CommentComponent comment={c} />
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
          {post.comments.length > 1 && (
            <button
              key="showcomments"
              className={styles["comments-button"]}
              onClick={toggleComments}
            >
              {showComments ? "Esconder" : "Ver todos"} os comentários
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PostComponent;
