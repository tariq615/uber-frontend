import conf from "../conf/conf";
import axios from "axios";

export class UserService {

  async getSuggestions(pickupVal) {
    try {
      const suggestions = await axios.get(`${conf.base_url}/maps/get-suggestions`, {
        params: {input: pickupVal },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return suggestions.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async getFare(pickup, destination){
    try {
      const fare = await axios.get(`${conf.base_url}/rides/get-fare`, {
        params: {pickup, destination},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return fare.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async createRide(rideData){
    try {
      const ride = await axios.post(`${conf.base_url}/rides/createRide`, rideData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      return ride.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); 
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
}
}
const userService = new UserService();

export default userService;
