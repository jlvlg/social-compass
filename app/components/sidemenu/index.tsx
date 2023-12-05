"use client";

import compass from "@assets/compass-negativo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import styles from "./sidemenu.module.scss";

export type Props = { onRedirect: () => void };

function SideMenu({ onRedirect }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <motion.div
      variants={{ hidden: { width: 0 }, visible: { width: "auto" } }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className={styles.container}>
        <div>
          <Image src={compass} alt="compass logo" />
          <nav>
            <Link
              onClick={onRedirect}
              href="/"
              className={segment === "(home)" ? styles.active : ""}
            >
              Página Inicial
            </Link>
            <Link
              onClick={onRedirect}
              href="/profile"
              className={segment === "profile" ? styles.active : ""}
            >
              Meu Perfil
            </Link>
            <Link
              onClick={onRedirect}
              href="/logout"
              className={segment === "logout" ? styles.active : ""}
            >
              Sair
            </Link>
          </nav>
        </div>
      </div>
    </motion.div>
  );
}

export default SideMenu;
