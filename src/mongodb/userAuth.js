import conf from "../conf/conf";
import axios from "axios";

export class UserAuthService {
  async createAccount(userData) {
    try {
      const registeredUser = await axios.post(
        `${conf.base_url}/users/register`,
        userData
      );
      return registeredUser;
    } catch (error) {
      if (error.response) {
        const errorMessages = error.response.data.errors.map(err => err.msg); 
        console.error("Server Errors:", errorMessages);
        throw errorMessages;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async login(userData) {
    try {
      const loginUser = await axios.post(
        `${conf.base_url}/users/login`,
        userData
      );
      return loginUser;
    } catch (error) {
      if (error.response) {
        const errorMessages = error.response.data.message? [error.response.data.message] : error.response.data.errors.map(err => err.msg);
        console.error("Server Errors:", errorMessages);
        throw errorMessages;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async getCurrentUser(token) {
    try {
      const profile = await axios.get(`${conf.base_url}/users/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return profile;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error);
      } else {
        console.error("Unexpected Error:", error.message);
      }
      throw error.response.data;
    }
  }

  async logout(token) {
    try {
      const logout = await axios.get(`${conf.base_url}/users/logout`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return logout;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error);
      } else {
        console.error("Unexpected Error:", error.message);
      }
      throw error.response.data;
    }
  }
}

const userAuthService = new UserAuthService();

export default userAuthService;
