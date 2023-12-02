class server {
  private baseURL = new URL("https://social-compass-server.onrender.com");
  private headers = { "Content-Type": "application/json" };

  async post<T extends {}>(path: string | URL, body: T) {
    const res = await fetch(new URL(path, this.baseURL), {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) throw { message: json.message, status: res.status };

    return json;
  }

  async signIn(username: string, password: string) {
    return await this.post("/auth/login", { username, password });
  }
}

const instance = new server();
export default instance;
