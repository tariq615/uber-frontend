import conf from "../conf/conf";
import axios from "axios";

export class CaptainService {
  async confirmRide(rideId, captainId) {
    try {
      const ride = await axios.post(
        `${conf.base_url}/rides/confirm-ride`,
        { rideId, captainId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return ride.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async startRide(rideId, otp) {
    try {
      const ride = await axios.get(`${conf.base_url}/rides/start-ride`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          rideId,
          otp,
        },
      });
      return ride.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async cancelRide(rideId) {
    try {
      const ride = await axios.get(`${conf.base_url}/rides/cancel-ride`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          rideId,
        },
      });
      return ride.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }

  async completeRide(rideId) {
    try {
      const ride = await axios.get(`${conf.base_url}/rides/complete-ride`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          rideId,
        },
      });
      return ride.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error); // Server-provided error details
        throw error.response.data;
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  }
}
const captainService = new CaptainService();

export default captainService;
