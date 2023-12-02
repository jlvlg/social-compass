import getIcon from "@/app/assets/icons";
import { Post } from "@/app/util/types";
import dayjs from "@util/dates";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Comment from "../comment";
import Interaction from "../interaction";
import UserImage from "../userimage";
import styles from "./post.module.scss";

export type Props = { post: Post };

const post = {
  id: "831b1895-0b63-4c3d-b1a3-5eb893c6aab0",
  text: "Pato no tucupi com arroz de jambu - prato brasileiro típico da culinária da região Norte do Brasil, em especial do estado do Pará. É elaborado com tucupi, líquido de cor amarela extraído da raiz da mandioca brava, e com jambu, erva típica da região norte. ",
  location: "Pipocolandia - Bahia",
  likes: 2300,
  image:
    "https://pbs.twimg.com/media/F9NVu8jaUAAhc1W?format=jpg&name=4096x4096",
  authorId: "62cccf40-08e1-49ea-acf6-0ec6dcf5920a",
  createdAt: "2023-10-02T03:44:13.876Z",
  updatedAt: "2012-12-02T03:44:13.877Z",
  author: {
    image: "https://avatars.githubusercontent.com/u/72623813?v=4",
    name: "Teste",
    id: "62cccf40-08e1-49ea-acf6-0ec6dcf5920a",
  },
  comments: [
    {
      id: "ac8c1c91-9b9b-4efe-8a3f-ebdcdb0f0174",
      content:
        "A água é um recurso natural fundamental para a existência de todas as formas de vida: pessoas, animais e plantas. Ela é composta por dois elementos químicos: 2 átomos de hidrogênio e 1 de oxigênio",
      authorId: "45ed4c40-a934-4456-afc2-dc67492afe6a",
      postId: "22ebcf80-c2b9-43a0-b765-3533e2fbf36b",
      createdAt: "2023-12-01T05:48:26.712Z",
      updatedAt: "2023-12-01T05:48:26.712Z",
      author: {
        image: "https://avatars.githubusercontent.com/u/72623813?v=4",
        name: "Estevão Ferreira",
        id: "45ed4c40-a934-4456-afc2-dc67492afe6a",
      },
    },
    {
      id: "ac8c1c91-9b9b-4efe-8a3f-ebdcdb0f0175",
      content: "primeiro comment",
      authorId: "45ed4c40-a934-4456-afc2-dc67492afe6a",
      postId: "22ebcf80-c2b9-43a0-b765-3533e2fbf36b",
      createdAt: "2023-12-01T05:48:26.712Z",
      updatedAt: "2023-12-01T05:48:26.712Z",
      author: {
        image: "https://avatars.githubusercontent.com/u/72623813?v=4",
        name: "Teste",
        id: "45ed4c40-a934-4456-afc2-dc67492afe6a",
      },
    },
  ],
};

function PostComponent({}: Props) {
  const [showComments, setShowComments] = useState(false);
  const Clock = getIcon("clock");

  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <UserImage user={post.author} className={styles["author-image"]} />
        <div>
          {post.author.name}
          <div className={styles.date}>
            <Clock />
            {dayjs().to(post.createdAt)}
            {post.location && " em "}
            <span>{post.location}</span>
          </div>
        </div>
      </div>
      {post.text}
      {post.image && <img src={post.image} />}
      <div className={styles.interactions}>
        <Interaction icon="like" text="Curtiu" interactions={+post.likes} />
        <Interaction
          icon="comment"
          text="Comentários"
          interactions={post.comments.length}
        />
        <Interaction icon="share" text="Compartilhar" />
      </div>
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
                    <Comment comment={c} />
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
          {post.comments.length > 1 && (
            <button
              key="showcomments"
              onClick={() => setShowComments((prev) => !prev)}
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
