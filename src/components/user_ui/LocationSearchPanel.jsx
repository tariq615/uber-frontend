import React from "react";

const LocationSearchPanel = ({suggestions, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (elem) => {
      if (activeField === 'pickup') {
        setPickup(elem.place_name)
    } else if (activeField === 'destination') {
        setDestination(elem.place_name)
    }
    }

  return (
    <div>
      {/* Display fetched suggestions */}
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-4 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem.place_name}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
