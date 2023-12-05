"use client";

import PostList from "@/app/components/postlist";
import About from "@components/about";
import Banner from "@components/banner";
import { useSelector } from "@store";
import server from "@util/server";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export type Props = { params: { id?: string[] } };

function Profile({ params }: Props) {
  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState(loggedUser);

  useEffect(() => {
    const abort = new AbortController();
    if (params.id) {
      server
        .getUserByID(params.id[0], loggedUser.token!, abort.signal)
        .then((res) => setUser(res));
    }
    return () => {
      abort.abort();
    };
  }, [loggedUser.token, params]);

  return (
    <div className={styles.page}>
      <Banner user={user} />
      <div className={styles.userinfo}>
        <About user={user} />
        <div className={styles.posts}>
          <div className={styles.tabs}>
            Followers Following <span>Posts</span>
          </div>
          <PostList posts={[]} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
