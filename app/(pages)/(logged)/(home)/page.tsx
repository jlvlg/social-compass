"use client";

import List from "@components/list";
import PostList from "@components/postlist";
import { useDispatch, useSelector } from "@store";
import server from "@util/server";
import { Post, User } from "@util/types";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const abort = new AbortController();
    if (user.token) {
      server.getAllPosts(user.token, abort.signal).then((res) => setPosts(res));
      server
        .getAllUsers(user.token, abort.signal)
        .then((res) => setFriends(res));
    }
    return () => {
      abort.abort();
    };
  }, [user.token, dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.posts}>
        <PostList posts={posts} />
      </main>
      <section className={styles.side}>
        <List
          title="Meus Amigos"
          items={friends.map((u) => ({
            id: u.id || "",
            image: u.image,
            title: u.name || "",
            link: `/profile/${u.id}`,
          }))}
        />
      </section>
    </div>
  );
}
