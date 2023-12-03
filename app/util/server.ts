import { Post, User } from "./types";

class server {
  // private baseURL = new URL("https://social-compass-server.onrender.com");
  private baseURL = new URL("http://localhost:3001");
  private headers = { "Content-Type": "application/json" };

  private async get(
    path: string | URL,
    options?: any,
    headers: Record<string, string> = {},
  ) {
    const res = await fetch(new URL(path, this.baseURL), {
      ...options,
      headers: { ...this.headers, ...headers },
    });
    console.log(res);

    const json = await res.json();

    if (!res.ok) throw { message: json.message, status: res.status };

    return json;
  }

  private async post<T extends {}>(
    path: string | URL,
    body: T,
    options?: any,
    headers: Record<string, string> = {},
  ) {
    const res = await fetch(new URL(path, this.baseURL), {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
      headers: { ...this.headers, ...headers },
    });
    console.log(res);

    const json = await res.json();

    if (!res.ok) throw { message: json.message, status: res.status };

    return json;
  }

  async signIn(username: string, password: string, signal?: AbortSignal) {
    console.log("signin sent");
    return await this.post(
      "/auth/login",
      { username, password },
      { cache: "no-store", signal },
    );
  }

  async register(values: Record<string, string>, signal?: AbortSignal) {
    console.log("register sent");
    return await this.post("/auth/register", values, {
      cache: "no-store",
      signal,
    });
  }

  async getUserByID(id: string, token: string, signal?: AbortSignal) {
    console.log("getuser sent");
    return (await this.get(
      `/users/${id}`,
      { signal, cache: "no-store" },
      { Authorization: "Bearer " + token },
    )) as User;
  }

  async getAllUsers(token: string, signal?: AbortSignal) {
    console.log("getusers sent");
    return (await this.get(
      "/users",
      { signal },
      { Authorization: "Bearer " + token },
    )) as User[];
  }

  async getAllPosts(token: string, signal?: AbortSignal) {
    console.log("getposts sent");
    return (await this.get(
      "/posts",
      { signal, cache: "no-store" },
      { Authorization: "Bearer " + token },
    )) as Post[];
  }

  async postComment(
    content: string,
    authorId: string,
    postId: string,
    token: string,
    signal?: AbortSignal,
  ) {
    console.log("postcomment sent");
    return await this.post(
      "/comments",
      { content, authorId, postId },
      { signal },
      { Authorization: "Bearer " + token },
    );
  }
}

const instance = new server();
export default instance;
