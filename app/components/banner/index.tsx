import { useSelector } from "@/app/store";
import cover from "@assets/cover.jpeg";
import { User } from "@util/types";
import Image from "next/image";
import Button from "../button";
import Card from "../card";
import UserImage from "../userimage";
import styles from "./banner.module.scss";

export type Props = { user: User };

function Banner({ user }: Props) {
  const loggedUser = useSelector((state) => state.user);

  return (
    <Card className={styles.container}>
      <Image src={cover} alt="Cover" />
      <header className={styles.user}>
        <UserImage user={user} className={styles.userimage} />
        <hgroup>
          <h1>{user.name}</h1>
          <p>{user.occupation}</p>
        </hgroup>
      </header>
      {loggedUser.id === user.id && (
        <Button
          className={styles.edit}
          label="Editar Perfil"
          type="primary"
          onClick={() => {}}
        />
      )}
    </Card>
  );
}

export default Banner;
