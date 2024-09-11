import Axios from "../plugins/axios";
import { setLoginRequestFlag } from "../plugins/axios";

class AuthService {
  async login(payload) {
    try {
      setLoginRequestFlag(true);
      const data = await Axios.post(`/admin/login`, payload);
      if (data?.access_token) {
        localStorage.setItem("token", data?.access_token);
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.access_token}`;
      }
      setLoginRequestFlag(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoginRequestFlag(false);
      return Promise.reject(error);
    }
  }

  async logout() {
    try {
      //const response = await Axios.post(`/admin/logout`);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.log("logout error", error);
      Promise.reject(error);
    }
  }
}
export const authService = new AuthService();
