import { Comment } from "@types";
import Link from "next/link";
import UserImage from "../userimage";
import styles from "./comment.module.scss";

export type Props = { comment: Comment };

function CommentComponent({ comment }: Props) {
  return (
    <div className={styles.comment}>
      <Link href={comment.author.id}>
        <UserImage user={comment.author} className={styles["author-image"]} />
      </Link>
      <div>
        <Link href={comment.author.id}>{comment.author.name}: </Link>
        {comment.content}
      </div>
    </div>
  );
}

export default CommentComponent;
