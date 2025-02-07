import { React, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap"; // Add GSAP import
import UserLogo from "../logo/UserLogo";
import userAuth from "../../mongodb/userAuth";
import { roleAuth } from "../../store/roleAuthSlice";
import { userLogin } from "../../store/userAuthSlice";
import { useDispatch } from "react-redux";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState([]);
  const errorRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await userAuth.createAccount(newUser);
      // console.log(response);

      if (response.status === 201) {
        const { user, token } = response.data.data;
        dispatch(roleAuth("user"));
        dispatch(userLogin({ userData: user }));
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      setError(error);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
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
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <UserLogo />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

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
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
