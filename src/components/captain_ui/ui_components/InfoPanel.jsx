import React from "react";
import PropTypes from "prop-types";
import Information from "../../user_ui/ui_components/Informations";

const InfoPanel = ({
  title,
  user,
  distance,
  pickup,
  destination,
  fare,
  currency = "Rs.",
  onClose,
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={onClose}
        aria-label="Close confirm ride panel"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">{title}</h3>

      <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="/images/self/noImage.jpg"
          />
          <h2 className="text-lg font-medium">{user}</h2>
        </div>
        <h5 className="text-lg font-semibold">{distance}</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <Information
          pickup={pickup}
          destination={destination}
          fare={fare}
          currency={currency}
        />
      </div>
    </div>
  );
};

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  fare: PropTypes.number.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default InfoPanel;
