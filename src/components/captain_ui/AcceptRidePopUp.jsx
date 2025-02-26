import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoPanel from "./ui_components/InfoPanel";
import captainService from "../../mongodb/captainConfig";
import Loading from "../Loading";

const AcceptRidePopUp = ({ride, setRidePopupPanel, setAcceptRidePopupPanel }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setAcceptRidePopupPanel(false);
  };

  const submitHander = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await captainService.startRide(ride._id, otp);
      console.log(response);
      
      if (response.statusCode === 200) {
        setLoading(false);
        setAcceptRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: response.data } });
      }
    } catch (error) {
      setLoading(false);
      alert(`Error accepting ride: ${error.message}`);
    }
  };

  const cancelRide = async () => {

    const response = await captainService.cancelRide(ride._id);
    console.log(response);
    try {
      if (response.statusCode === 200) {
        setRidePopupPanel(false);
        setAcceptRidePopupPanel(false);
      }
    } catch (error) {
      alert(`Error cancelling ride: ${error.message}`);
    }
    
  };

  return loading ? (<Loading />): (
    <div>
      <InfoPanel
        title="Confirm to start the Ride"
        user={`${ride?.user.fullname.firstname} ${ride?.user.fullname.lastname}`}
        distance={`${(ride?.distance / 1000).toFixed(2)}km`}
        pickup={ride?.pickup}
        destination={ride?.destination}
        fare={ride?.fare}
        onClose={handleClose}
      />

      <div className="mt-6 w-full">
        <form onSubmit={submitHander}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
            placeholder="Enter OTP"
          />

          <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
            Confirm
          </button>
          <button
            onClick={cancelRide}
            className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcceptRidePopUp;
