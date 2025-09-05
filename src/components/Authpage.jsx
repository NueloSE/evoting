import Mininav from "./Mininav";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Footer from "./Footer";
import { useState, useRef } from "react";
import { authSignInWithGoogle } from "../server/backend";
import useStore from "../server/store";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

function Authpage() {
  const [_signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const signInBtn = useRef(null);
  const signUpBtn = useRef(null);
  const { user, _loading, initializeAuth, _error } = useStore();
  const navigate = useNavigate();

  function handleSignUp() {
    setSignUp(true);
    setSignIn(false);
    signUpBtn.current.classList.add("active");
    signInBtn.current.classList.remove("active");
  }

  function handleSignIn() {
    setSignUp(false);
    setSignIn(true);
    signInBtn.current.classList.add("active");
    signUpBtn.current.classList.remove("active");
  }

  const handleGoogleSignIn = async () => {
    authSignInWithGoogle();
    initializeAuth();
    if (user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="space-y-24">
      <div>
        <div className="sticky top-0">
          <Mininav userType="voter" />
        </div>

        <div
          id="features"
          className="text-center px-4 py-24 max-w-3xl mx-auto "
        >
          <h2>Welcome to EVotes</h2>
          <p>Sign in to your account or create a new one to get started</p>
        </div>

        {/* form container */}
        <div className="max-w-xl mx-auto shadow-2xl border border-slate-300  rounded-2xl px-8 py-12 mb-8">
          <h4 className="text-center ">Authentication</h4>

          <button
            onClick={handleGoogleSignIn}
            className="btn flex items-center justify-center gap-2 border w-full py-4 "
          >
            <FcGoogle /> Continue with Google
          </button>

          <div className="relative border-2 border-slate-300 my-24">
            <p className="absolute w-fit left-[37%] -top-4 bg-slate-100 px-4 py-2">
              OR CONTINUE WITH
            </p>
          </div>

          {/* signin or signup buttons */}
          <div className="flex justify-between w-full bg-gray-300 rounded-full  py-2 ">
            <button
              ref={signInBtn}
              onClick={handleSignIn}
              id="sign-in-btn"
              className=" w-1/2 text-center cursor-pointer  p-2 active"
            >
              Sign In
            </button>
            <button
              ref={signUpBtn}
              onClick={handleSignUp}
              id="sign-up-btn"
              className="text-center cursor-pointer w-1/2 p-2 "
            >
              Sign Up
            </button>
          </div>

          {/*  sign in  or sign up*/}

          {signIn ? <Signin /> : <Signup />}
        </div>

        <p className="text-center">
          Need help?{" "}
          <Link to="/#contact" className="text-slate-900   hover:underline">
            Contact Support
          </Link>
        </p>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Authpage;
