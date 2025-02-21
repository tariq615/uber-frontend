import React from "react";

const Informations = ({pickup, destination, fare, currency}) => {
  return (
    <div className="w-full h-full mt-5">
      <div className="flex items-center gap-5 p-3 border-b-2">
        <i className="ri-map-pin-user-fill"></i>
        <div>
          <h3 className="h-[7vh] tracking-tighter leading-tight text-lg font-medium flex flex-col items-center justify-center">{pickup?.length > 70 ? `${pickup.slice(0, 70)}...`: pickup}</h3>
          <p className="text-sm -mt-1 text-gray-600">Pickup</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3 border-b-2">
        <i className="text-lg ri-map-pin-2-fill"></i>
        <div>
          <h3 className="h-[7vh] tracking-tighter leading-tight text-lg font-medium flex flex-col items-center justify-center">{destination?.length > 70 ? `${destination.slice(0,70)}...`: destination}</h3>
          <p className="text-sm -mt-1 text-gray-600">Destination</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-3">
        <i className="ri-currency-line"></i>
        <div>
          <h3 className="text-lg font-medium">
            {currency} {fare}
          </h3>
          <p className="text-sm -mt-1 text-gray-600">Payment method: <span className="text-gray-800">Cash</span></p>
        </div>
      </div>
    </div>
  );
};

export default Informations;
