import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDetails from "./captain_ui/CaptainDetails";
import { useSelector } from "react-redux";
import RidePopUp from "./captain_ui/RidePopUp";
import AcceptRidePopUp from "./captain_ui/AcceptRidePopUp";
import { SocketContext } from "../context/SocketContext";
import captainService from "../mongodb/captainConfig";
import LiveTracking from "./LiveTracking";
import CapLogoutBtn from "./captain/CapLogoutBtn";

const CaptainHome = () => {
  const capDetails = useSelector((state) => state.captainAuth.captainData);
  const { socket } = useContext(SocketContext);

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [AcceptRidePopupPanel, setAcceptRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const AcceptRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    socket.emit("join", {
      userId: capDetails._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Emit the location update event to the server

            socket.emit("update-location-captain", {
              userId: capDetails._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
            socket.on("error", (data) => {
              console.error(data.message); // Logs error messages like "Invalid location data"
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    const handleNewRide = (data) => {
      console.log(data);
      setRide(data);
      setRidePopupPanel(true);
  
      const timeout = setTimeout(() => {
        setRidePopupPanel(false);
      }, 10000);
  
      // Clear the timeout if the component unmounts before the timeout completes
      return () => clearTimeout(timeout);
    };
  
    // Attach the event listener
    socket.on('new-ride', handleNewRide);
  
    // Cleanup the event listener on unmount
    return () => socket.off('new-ride', handleNewRide);
  }, [socket]);
  

  async function acceptRide() {
    try {
      const response = await captainService.confirmRide(
        ride._id,
        capDetails._id
      );

      if (response.statusCode === 200) {
        // Handle success case
        setRidePopupPanel(false);
        setAcceptRidePopupPanel(true);
      }
    } catch (error) {
      alert(`Error accepting ride: ${error.message}`);
      setRidePopupPanel(false);
    }
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (AcceptRidePopupPanel) {
        gsap.to(AcceptRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(AcceptRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [AcceptRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-40">
        <img
        className="w-16 absolute left-5 top-5 z-30"
        src="/images/self/userlogo.webp"
        alt=""
      />
      <CapLogoutBtn />
        {/* <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link> */}
      </div>
      <div className="h-3/5"> 
        <LiveTracking color="#d5622d" />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails capDetails={capDetails}/>
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          acceptRide={acceptRide}
        />
      </div>
      <div
        ref={AcceptRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <AcceptRidePopUp
          ride={ride}
          setAcceptRidePopupPanel={setAcceptRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};
export default CaptainHome;
