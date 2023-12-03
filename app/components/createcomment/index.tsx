import Icons from "@assets/icons";
import { useSelector } from "@store";
import server from "@util/server";
import { Post } from "@util/types";
import { ChangeEvent, FormEvent, useId, useState } from "react";
import UserImage from "../userimage";
import styles from "./createcomment.module.scss";

export type Props = { post: Post };

function CreateComment({ post }: Props) {
  const user = useSelector((state) => state.user);
  const id = useId();
  const [content, setContent] = useState("");

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setContent(evt.target.value);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    server.postComment(content, user.id!, post.id, user.token!);
    setContent("");
  }

  return (
    <div className={styles.container}>
      <UserImage user={user} className={styles.image} />
      <form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
        <input
          id={id}
          type="text"
          required
          value={content}
          onChange={(evt) => handleChange(evt)}
        />
        <label style={{ opacity: content ? 0 : 1 }} htmlFor={id}>
          Tem algo a dizer?
        </label>
        <div className={styles.icons}>
          <Icons.camera />
          <Icons.image />
          <Icons.clip />
          <Icons.mappin />
          <Icons.smile />
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
