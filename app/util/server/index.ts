import axios, { Axios } from "axios";

class server {
  private axios = new Axios({
    baseURL: "https://social-compass-server.onrender.com",
    headers: { "Content-Type": "application/json" },
  });

  async signIn(username: string, password: string) {
    try {
      const res = await this.axios.post(
        "/auth/login",
        JSON.stringify({ username, password }),
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

const instance = new server();
export default instance;
