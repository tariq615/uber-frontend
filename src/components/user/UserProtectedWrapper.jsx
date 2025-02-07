import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAuth from "../../mongodb/userAuth";
import { userLogin, userLogout } from "../../store/userAuthSlice";
import { roleUnAuth } from "../../store/roleAuthSlice";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(userLogout());
      dispatch(roleUnAuth());
      navigate("/login");
    };

    if (role === "captain") {
      navigate("/captain-home");
    } else {
      const fetchUserData = async () => {
        if (!token) {
          console.log("Token is missing, redirecting to login...");
          handleLogout();
          return;
        }
        try {
          const response = await userAuth.getCurrentUser(token);
          if (response.status === 200) {
            const { data } = response.data;
            // console.log("User data fetched successfully:", data);
            dispatch(userLogin({ userData: data }));
          } else {
            console.error("Invalid response status:", response.status);
            handleLogout();
          }
        } catch (err) {
          console.error("Error during authentication:", err);
          handleLogout();
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [role, dispatch, navigate]);

  return !isLoading ? <>{children}</> : <div>Loading...</div>;
};

export default UserProtectedWrapper;
