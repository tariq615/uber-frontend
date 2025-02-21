import { React, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap"; // Add GSAP import
import UserLogo from "../logo/UserLogo";
import userAuth from "../../mongodb/userAuth";
import { roleAuth } from "../../store/roleAuthSlice";
import { userLogin } from "../../store/userAuthSlice";
import { useDispatch } from "react-redux";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const errorRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await userAuth.login(userData);
      // console.log(response);

      if (response.status === 200) {
        const { user, token } = response.data.data;
        dispatch(roleAuth("user"));
        dispatch(userLogin({ userData: user }));
        localStorage.setItem("token", token);
        navigate("/home");
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
      {/* <img className='w-16 mb-10' src="/images/self/sawari2.jpg" alt="" /> */}
        <UserLogo css="w-16 mb-10"/>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
