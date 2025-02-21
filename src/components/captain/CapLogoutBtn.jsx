import React from "react";
import captainAuth from "../../mongodb/captainAuth";
import { roleUnAuth } from "../../store/roleAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CapLogoutBtn = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await captainAuth.logout(token);
        if (response.status === 200) {
          localStorage.removeItem("token");
          dipatch(roleUnAuth);
          navigate("/captain-login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      navigate("/captain-login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-30"
    >
       <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </button>
  );
};

export default CapLogoutBtn;
