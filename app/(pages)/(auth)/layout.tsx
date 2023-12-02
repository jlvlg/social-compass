"use client";

import compass from "@assets/compass-negativo.png";
import sideImage from "@assets/side-image.jpeg";
import Welcome from "@components/atoms/welcome";
import Image from "next/image";
import React from "react";
import styles from "./layout.module.scss";

export type Props = {};

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <main className={styles.layout}>
      <div className={styles["form-container"]}>
        <div>
          <Welcome />
          {children}
        </div>
      </div>
      <div className={styles["image-container"]}>
        <Image className={styles.laptop} src={sideImage} alt="Open laptop" />
        <Image className={styles.compass} src={compass} alt="Compass logo" />
      </div>
    </main>
  );
}

export default AuthLayout;
