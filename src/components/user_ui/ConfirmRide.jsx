import React from "react";
import InfoPanel from "./ui_components/InfoPanel";

const ConfirmRide = ({ setConfirmRidePanel, setLookingForDriverPanel, img, pickup, destination, fare, createRide }) => {
  const handleClose = () => setConfirmRidePanel(false);
  const handleConfirm = () => {
    setLookingForDriverPanel(true);
    setConfirmRidePanel(false);
    createRide();
  };

  return (
      <InfoPanel
        title={"Confirm your Ride"}
        img={img}
        pickup={pickup}
        destination={destination}
        fare={fare}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
  );
};

export default ConfirmRide;
