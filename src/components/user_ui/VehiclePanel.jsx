import React from 'react'
import VehicleOption from './ui_components/VehicleOption';


const VehiclePanel = ({setVehiclePanel, setConfirmRidePanel, setImg, setVehicleType, fares, setFare}) => {
  const vehicleData = [
    {
      imgSrc: "/images/vehiclelogos/car.webp",
      type: "car",
      title: "UberGo",
      capacity: "4",
      time: "2 mins away",
      description: "Affordable, compact rides",
      price: fares.car,
    },
    {
      imgSrc: "/images/vehiclelogos/bike.webp",
      type: "moto",
      title: "Moto",
      capacity: "1",
      time: "3 mins away",
      description: "Affordable motorcycle rides",
      price: fares.moto,
    },
    {
      imgSrc: "/images/vehiclelogos/autoR.webp",
      type: "auto",
      title: "UberAuto",
      capacity: "3",
      time: "3 mins away",
      description: "Affordable Auto rides",
      price: fares.auto,
    },
  ];
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {vehicleData.map((vehicle, index) => (
        <VehicleOption
          key={index}
          {...vehicle}
          onClick={() => {
            setConfirmRidePanel(true);
            setVehiclePanel(false);
            setImg(vehicle.imgSrc);
            setVehicleType(vehicle.type);
            setFare(vehicle.price)
          }}
        />
      ))}
    </div>
  );
}

export default VehiclePanel