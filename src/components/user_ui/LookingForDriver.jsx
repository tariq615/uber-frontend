import React from "react";
import InfoPanel from "./ui_components/InfoPanel";

const LookingForDriver = ({img, setLookingForDriverPanel, setWaitingForDriverPanel, pickup, destination, fare}) => {
    
    const handleClose = () => setLookingForDriverPanel(false);

  return (
    <InfoPanel
      title={"Looking for Driver"}
      img={img}
      pickup={pickup}
      destination={destination}
      fare={fare}
      onClose={handleClose}
    />
  );
};

export default LookingForDriver;
