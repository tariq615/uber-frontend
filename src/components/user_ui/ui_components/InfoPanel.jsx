import React from "react";
import PropTypes from "prop-types";
import Information from "./Informations";

const InfoPanel = ({
  title,
  img,
  pickup,
  destination,
  fare,
  currency = "Rs.",
  onClose,
  onConfirm,
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

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="flex gap-2 items-center justify-between">
          {/* Animated dots - left side */}
          {[...Array(2)].map((_, i) => (
            <span key={`left-dot-${i}`} className="relative flex h-3 w-3">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative rounded-full h-3 w-3 bg-green-400" />
            </span>
          ))}

          {/* Central image */}
          <img className="h-20 w-auto" src={img} alt="Vehicle" loading="lazy" />

          {/* Animated dots - right side */}
          {[...Array(2)].map((_, i) => (
            <span key={`right-dot-${i}`} className="relative flex h-3 w-3">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative rounded-full h-3 w-3 bg-green-400" />
            </span>
          ))}
        </div>
        <Information
          pickup={pickup}
          destination={destination}
          fare={fare}
          currency={currency}
        />
        {onConfirm && (
          <button
            onClick={onConfirm}
            className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default InfoPanel;
