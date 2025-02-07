import { React, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap"; // Add GSAP import
import CaptainLogo from "../logo/CaptainLogo";
import captainAuth from "../../mongodb/captainAuth";
import { roleAuth } from "../../store/roleAuthSlice";
import { captainLogin } from "../../store/captainAuthSlice";
import { useDispatch } from "react-redux";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const errorRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password,
    };

    try {
      const response = await captainAuth.login(captain);
      // console.log(response);

      if (response.status === 200) {
        const { captain, token } = response.data.data;
        dispatch(roleAuth("captain"));
        dispatch(captainLogin({ captainData: captain }));
        localStorage.setItem("token", token);
        navigate("/captain-home");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const tl = gsap.timeline();

      // Animate container
      tl.from(errorRef.current, {
        duration: 0.3,
        opacity: 0,
        y: 20,
        ease: "power2.out",
      }).to(errorRef.current, {
        duration: 0.8,
        keyframes: {
          "0%": { x: 0 },
          "25%": { x: 8 },
          "50%": { x: -8 },
          "75%": { x: 4 },
          "100%": { x: 0 },
        },
        ease: "elastic.out(1, 0.3)",
      });

      // Clear errors after 5 seconds (optional)
      const timer = setTimeout(() => setError([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [error.length]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <CaptainLogo />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className=""
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />
          <div ref={errorRef} className="error-container">
            {error.length > 0 && (
              <div className="space-y-2">
                {error.map((errors, index) => (
                  <p
                    key={index}
                    className="text-red-500 text-sm font-semibold text-center p-2"
                  >
                    {errors}
                  </p>
                ))}
              </div>
            )}
          </div>
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
