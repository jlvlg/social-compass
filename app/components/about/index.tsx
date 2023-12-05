import Icons from "@/app/assets/icons";
import dayjs from "@util/dates";
import { User } from "@util/types";
import Card from "../card";
import styles from "./about.module.scss";

export type Props = { user: User };

function About({ user }: Props) {
  return (
    <Card className={styles.container}>
      <h2>Sobre</h2>
      <ul>
        <li>
          <Icons.usernegative />
          {user.sex || "Não especificado"}
        </li>
        <li>
          <Icons.cake />
          {dayjs(user.birthdate!).format(
            `[Nascid${
              user.sex === "Feminino" ? "a" : "o"
            } em ]DD[ de ]MMMM[, ]YYYY`,
          )}
        </li>
        <li>
          <Icons.mappinnegative />
          {user.address || "Não especificado"}
        </li>
        <li>
          <Icons.mail />
          {user.email}
        </li>
        <li>
          <Icons.phonenegative />
          {user.phone || "Não especificado"}
        </li>
      </ul>
    </Card>
  );
}

export default About;
