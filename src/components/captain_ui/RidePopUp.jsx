import React from "react";
import InfoPanel from "./ui_components/InfoPanel";


const RidePopUp = ({ride, setRidePopupPanel, acceptRide}) => {
    
    const handleClose = () => {
        setRidePopupPanel(false);
    };

    // console.log("from ride", ride);
  
    return (
    <div>
      <InfoPanel 
      title="New Ride Available!" 
      user={`${ride?.user.fullname.firstname} ${ride?.user.fullname.lastname}`}
      distance={`${(ride?.distance / 1000).toFixed(2)}km`}
      pickup={ride?.pickup} 
      destination={ride?.destination} 
      fare={ride?.fare} 
      onClose={handleClose}
      />
      <div className="mt-5 w-full ">
        <button
          onClick={() => {
            acceptRide();
          }}
          className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={() => {
            setRidePopupPanel(false);
          }}
          className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
