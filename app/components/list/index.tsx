import Icons from "@/app/assets/icons";
import { useToggle } from "@/app/util/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Card from "../card";
import UserImage from "../userimage";
import styles from "./list.module.scss";

export type Props = {
  items: {
    id: string;
    image?: string;
    title: string;
    subtitle?: string;
    link: string;
  }[];
  title: string;
};

function List({ items, title }: Props) {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <Card className={styles.container}>
      <button onClick={toggleExpanded}>
        {title}
        <motion.span
          initial={{ rotate: 180 }}
          animate={{ rotate: expanded ? 0 : 180 }}
        >
          <Icons.caret />
        </motion.span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.ul
            variants={{
              hidden: { height: 0, marginTop: 0 },
              visible: { height: "auto", marginTop: 24 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {items.map((i) => (
              <li key={i.id}>
                <Link href={i.link}>
                  <UserImage className={styles.image} user={i} />
                  {i.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default List;
