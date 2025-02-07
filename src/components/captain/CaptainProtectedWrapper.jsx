import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import captainAuth from "../../mongodb/captainAuth";
import { captainLogin, captainLogout } from "../../store/captainAuthSlice";
import { roleUnAuth } from "../../store/roleAuthSlice";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(token, role);
  
  useEffect(() => {
    const handleLogouts = () => {
      localStorage.removeItem("token");
      dispatch(captainLogout());
      dispatch(roleUnAuth());
      navigate("/captain-login");
    };

    if (role === "user") {
      navigate("/home");
    } else {
      const fetchCaptainData = async () => {
        if (!token) {
          console.log("Token is missing, redirecting to login...");
          handleLogouts();
          return;
        }
        
        try {
          const response = await captainAuth.getCurrentCaptain(token);
          if (response.status === 200) {
            const { data } = response.data;
            // console.log("captain data fetched successfully:", data);
            dispatch(captainLogin({ captainData: data }));
          } else {
            console.error("Invalid response status:", response.status);
            handleLogouts();
          }
        } catch (err) {
          console.error("Error during authentication:", err);
          handleLogouts();
        } finally {
          setIsLoading(false);
        }
      };

      fetchCaptainData();
    }
  }, [role, dispatch, navigate]);

  return !isLoading ? <>{children}</> : <div>Loading...</div>;
};

export default CaptainProtectedWrapper;
