import React from 'react'

const VehicleOption = ({ imgSrc, title, capacity, time, description, price, onClick }) => (
    <div
      onClick={onClick}
      className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
    >
      <img className="h-10" src={imgSrc} alt={title} />
      <div className="ml-2 w-1/2">
        <h4 className="font-medium text-base">
          {title}
          <span>
            <i className="ri-user-3-fill"></i>
            {capacity}
          </span>
        </h4>
        <h5 className="font-medium text-sm">{time}</h5>
        <p className="font-normal text-xs text-gray-600">{description}</p>
      </div>
      <h2 className="text-lg font-semibold">Rs.{price}</h2>
    </div>
  );
  
export default VehicleOption