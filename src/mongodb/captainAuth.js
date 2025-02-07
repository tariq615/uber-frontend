import conf from "../conf/conf";
import axios from "axios";

export class CaptainAuthService {
  async createAccount(captainData) {
    try {
      const registeredcaptain = await axios.post(
        `${conf.base_url}/captains/register`,
        captainData
      );
      // console.log(registeredcaptain);
      return registeredcaptain;
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

  async login(captainData) {
    try {
      const logincaptain = await axios.post(
        `${conf.base_url}/captains/login`,
        captainData
      );
      return logincaptain;
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

  async getCurrentCaptain(token) {
    try {
      const profile = await axios.get(`${conf.base_url}/captains/get-profile`, {
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
      const logout = await axios.get(`${conf.base_url}/captains/logout`,{
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

const captainAuthService = new CaptainAuthService();

export default captainAuthService;
