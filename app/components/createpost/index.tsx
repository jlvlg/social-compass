import Icons from "@assets/icons";
import { useSelector } from "@store";
import server from "@util/server";
import { ChangeEvent, FormEvent, useId, useRef, useState } from "react";
import Button from "../button";
import Card from "../card";
import UserImage from "../userimage";
import styles from "./createpost.module.scss";

export type Props = {};

function CreatePost({}: Props) {
  const user = useSelector((state) => state.user);
  const id = useId();
  const [content, setContent] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setContent(evt.target.value);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    server.postPost(content, user.id!, user.token!);
    setContent("");
  }

  return (
    <Card className={styles.toplevel}>
      <div className={styles.container}>
        <UserImage user={user} className={styles.image} />
        <form
          ref={ref}
          className={styles.form}
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <input
            id={id}
            type="text"
            required
            value={content}
            onChange={(evt) => handleChange(evt)}
          />
          <label style={{ opacity: content ? 0 : 1 }} htmlFor={id}>
            No que você está pensando?
          </label>
        </form>
      </div>
      <div className={styles.icons}>
        <Icons.camera />
        <Icons.image />
        <Icons.clip />
        <Icons.mappin />
        <Icons.smile />
      </div>
      <Button
        label="Postar"
        type="primary"
        onClick={() => {
          ref.current?.requestSubmit();
        }}
      />
    </Card>
  );
}

export default CreatePost;
