"use client";

import AuthLayout from "@components/auth";
import SideMenu from "@components/sidemenu";
import Topbar from "@components/topbar";
import { actions, useDispatch, useSelector } from "@store";
import { useToggle } from "@util/hooks";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import styles from "./layout.module.scss";

export type Props = {};

function EnsureLogin({ children }: React.PropsWithChildren<Props>) {
  const user = useSelector((state) => state.user);
  const [isMenuExpanded, toggleMenuExpanded, setIsMenuExpanded] =
    useToggle(false);
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const res = dispatch(actions.user.loadUser(savedUser));

    return () => {
      res.abort();
    };
  }, [dispatch]);

  function onRedirect() {
    toggleMenuExpanded();
  }

  return (
    <>
      {user.token ? (
        <div className={styles.layout}>
          <AnimatePresence>
            {isMenuExpanded && <SideMenu onRedirect={onRedirect} />}
          </AnimatePresence>
          <div className={styles.page}>
            <Topbar
              isMenuExpanded={isMenuExpanded}
              onExpand={toggleMenuExpanded}
            />
            {children}
          </div>
        </div>
      ) : (
        <AuthLayout />
      )}
    </>
  );
}

export default EnsureLogin;
