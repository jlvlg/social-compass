import NotFound from "@assets/icons/image.svg";
import { User } from "@util/types";
import styles from "./userimage.module.scss";

export type Props = { user: User; className?: string };

function UserImage({ user, className }: Props) {
  return (
    <div className={`${styles.image} ${className}`}>
      {user.image ? (
        <img src={user.image} alt={`${user.name}'s profile picture`} />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default UserImage;
