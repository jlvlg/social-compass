"use client";

import PostComponent from "@components/post";
import { useDispatch, useSelector } from "@store";
import server from "@util/server";
import { Post } from "@util/types";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const abort = new AbortController();
    if (user.token) {
      server.getAllPosts(user.token, abort.signal).then((res) => setPosts(res));
    }
    return () => {
      abort.abort();
    };
  }, [user.token, dispatch]);

  return (
    <div>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <PostComponent post={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
