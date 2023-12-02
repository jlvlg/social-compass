"use client";

import compass from "@assets/compass-negativo.png";
import sideImage from "@assets/side-image.jpeg";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./layout.module.scss";
import Login from "./login";
import Register from "./register";

function AuthLayout() {
  const [login, setLogin] = useState(true);

  function toggleLogin() {
    setLogin((prev) => !prev);
  }

  return (
    <main className={styles.layout}>
      <div className={styles["form-container"]}>
        <div>
          {login ? (
            <Login onSwitch={toggleLogin} />
          ) : (
            <Register onSwitch={toggleLogin} />
          )}
        </div>
      </div>
      <div className={styles["image-container"]}>
        <Image
          priority
          className={styles.laptop}
          src={sideImage}
          alt="Open laptop"
        />
        <Image
          priority
          className={styles.compass}
          src={compass}
          alt="Compass logo"
        />
      </div>
    </main>
  );
}

export default AuthLayout;
