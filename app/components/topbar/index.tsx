import Icons from "@assets/icons";
import { useSelector } from "@store";
import { motion } from "framer-motion";
import Link from "next/link";
import UserImage from "../userimage";
import styles from "./topbar.module.scss";

export type Props = { isMenuExpanded: boolean; onExpand: () => void };

function Topbar({ isMenuExpanded, onExpand }: Props) {
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.topbar}>
      <button onClick={onExpand} className={styles.socialcompass}>
        <div>
          <motion.div
            initial={{ rotate: 180 }}
            animate={{ rotate: isMenuExpanded ? 0 : 180 }}
          >
            <Icons.arrow />
          </motion.div>
        </div>
        SocialCompass
      </button>
      <div>
        <Icons.globe />
        <Icons.bell />
        {user.name}
        <Link href="/profile">
          <UserImage user={user} className={styles.image} />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
