import { Comment } from "@types";
import UserImage from "../userimage";
import styles from "./comment.module.scss";

export type Props = { comment: Comment };

function CommentComponent({ comment }: Props) {
  return (
    <div className={styles.comment}>
      <UserImage user={comment.author} className={styles["author-image"]} />
      <div>
        <span>{comment.author.name}: </span>
        {comment.content}
      </div>
    </div>
  );
}

export default CommentComponent;
