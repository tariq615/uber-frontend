import React from "react";
import { useNavigate } from "react-router-dom";
import InfoPanel from "./ui_components/InfoPanel";
import captainService from "../../mongodb/captainConfig";
const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setFinishRidePanel(false);
  };

  const completeRide = async () => {
    const response = await captainService.completeRide(ride._id);
    try {
      if (response.statusCode === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      alert(`Error completing ride: ${error.message}`);
    }
  };

  return (
    <div>
      <InfoPanel
        title="Finish this Ride"
        user={`${ride?.user.fullname.firstname} ${ride?.user.fullname.lastname}`}
        distance={`${(ride?.distance / 1000).toFixed(2)}km`}
        pickup={ride?.pickup}
        destination={ride?.destination}
        fare={ride?.fare}
        onClose={handleClose}
      />
      <div className="mt-10 w-full">
        <button
          onClick={completeRide}
          className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
