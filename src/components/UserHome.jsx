import React, { useEffect, useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./user_ui/LocationSearchPanel";
import VehiclePanel from "./user_ui/VehiclePanel";
import ConfirmRide from "./user_ui/ConfirmRide";
import LookingForDriver from "./user_ui/LookingForDriver";
import WaitingForDriver from "./user_ui/WaitingForDriver";
import userService from "../mongodb/userConfig";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import  LiveTracking  from "./LiveTracking";
import { Link } from "react-router-dom";
import UserLogoutBtn from "./user/UserLogoutBtn";

const UserHome = () => {
  // setting variables
  const [pickup, setPickup] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [imgForConRide, setImgForConRide] = useState("");
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [fares, setFares] = useState({});
  const [fare, setFare] = useState(null);
  const [ride, setRide] = useState(null);
  const [rideStatus, setRideStatus] = useState(null);

  // getting user details
  const userDetails = useSelector((state) => state.userAuth.userData);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // for refrencing
  const logoRef = useRef(null);
  const logoutRef = useRef(null);
  const mapRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);

  useEffect(() => {
    socket.emit("join", {
      userId: userDetails._id,
      userType: "user",
    });
  }, [userDetails]);

  socket.on("ride-confirmed", (ride) => {
    setLookingForDriverPanel(false);
    setWaitingForDriverPanel(true);
    setRide(ride);
    setRideStatus("ride accepted");
    // console.log(ride);
  });

  socket.on("ride-started", (ride) => {
    setRideStatus("ride started");
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride, imgForConRide } }); // Updated navigate to include ride data
  });

  socket.on("ride-cancelled", (ride) => {
    setRideStatus("ride canceled");
    setWaitingForDriverPanel(false);
  });
  
  // Helper function for validating inputs
  const validateInput = (input, type) => {
    if (input.length < 3) {
      return `${type} must contain at least 3 characters.`;
    }
    return "";
  };

  const handlePickupChange = async (e) => {
    const inputValue = e.target.value;
    setPickup(inputValue);
    const errorMessage = validateInput(inputValue, "Pickup location");

    if (!errorMessage) {
      const response = await userService.getSuggestions(inputValue);
      if (response.data.length > 0) {
        setPickupSuggestions(response.data);
        setError("");
      }
    } else {
      setPickupSuggestions([]);
      setError(errorMessage);
    }
  };

  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value;
    setDestination(inputValue);
    const errorMessage = validateInput(inputValue, "Destination");

    if (!errorMessage) {
      const response = await userService.getSuggestions(inputValue);
      if (response.data.length > 0) {
        setDestinationSuggestions(response.data);
        setError("");
      }
    } else {
      setDestinationSuggestions([]);
      setError(errorMessage);
    }
  };

  const findTrip = async () => {
    setShowError(true);

    // Input validation
    if (pickup.length < 3 || destination.length < 3) {
      setError("Fields must contain at least 3 characters.");
      return;
    }

    try {
      // Get fare details
      const response = await userService.getFare(pickup, destination);

      if (response?.data) {
        setFares(response.data.fare);
        setError("");
        setVehiclePanel(true);
        setPanelOpen(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const createRide = async () => {
    const rideData = {
      pickup,
      destination,
      vehicleType,
    };

    try {
      const response = await userService.createRide(rideData);
      // console.log(response);
    } catch (error) {
      alert(`Error creating ride: ${error.message}`);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.set(logoRef.current, {zIndex: 0});
        gsap.set(logoutRef.current, {zIndex: 0});
        gsap.set(mapRef.current, {display: "none" });
        gsap.to(panelRef.current, {
          duration: 0.8,
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(logoRef.current, {
          duration: 0.5,
          zIndex: 1,
          ease: "power2.inOut",
        });
        gsap.to(logoutRef.current, {
          duration: 0.5,
          zIndex: 1,
          ease: "power2.inOut",
        });
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(mapRef.current, { display: "block", pointerEvents: "pointer" }); // Restores the map
          },
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (lookingForDriverPanel) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverPanel]
  );

  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        ref={logoRef}
        className="w-16 absolute left-5 top-5"
        src="/images/self/userlogo.webp"
        alt=""
      />
      <UserLogoutBtn ref={logoutRef}/>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
      <div ref={mapRef} className="h-[70%]">
        <LiveTracking color="#3b82f6"/>
      </div>
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3 bg-white">
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
            {showError && error && (
              <p className="text-red-600 text-center leading-tight">{error}</p>
            )}
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setImg={setImgForConRide}
          setVehicleType={setVehicleType}
          fares={fares}
          setFare={setFare}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          img={imgForConRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
          createRide={createRide}
        />
      </div>
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          img={imgForConRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setLookingForDriverPanel={setLookingForDriverPanel}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          img={imgForConRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default UserHome;
