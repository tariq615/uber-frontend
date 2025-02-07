import React from "react";
import userAuth from "../../mongodb/userAuth";
import { roleUnAuth } from "../../store/roleAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserLogoutBtn = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await userAuth.logout(token);
        if (response.status === 200) {
          localStorage.removeItem("token");
          dipatch(roleUnAuth);
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default UserLogoutBtn;
