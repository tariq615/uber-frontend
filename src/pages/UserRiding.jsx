import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import UserLogo from "../components/logo/UserLogo";

const UserRiding = () => {
  const location = useLocation();
  const { ride, imgForConRide } = location.state || {} // Retrieve ride data
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate();

  socket.on("ride-completed", () => {
      navigate('/home')
  })

  return (
    <div className="h-screen">
      <UserLogo />
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-30"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2"><LiveTracking color="#3b82f6" /></div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src={imgForConRide}
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{`${ride?.captain.fullname.firstname} ${ride?.captain.fullname.lastname}`}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.destination}</h3>
                <p className="text-sm -mt-1 text-gray-600">destination</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRiding;
