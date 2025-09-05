import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { createNewUser } from "../server/backend";

function Signup() {
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [fullName, setFullName] = useState("");

  function handleSubmit(event, userEmail, userPassword) {
    event.preventDefault();
    createNewUser( userEmail, userPassword);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <div>
        <label htmlFor="email">Full Name</label>
        <div className="relative ">
          <input
            type="text"
            className="px-12 py-4"
            id="password"
            placeholder="Enter your full name"
            // onChange={(e) => setFullName(e.target.value)}
          />

          <FiUser className="absolute top-5 left-5 text-lg " />
        </div>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div className="relative ">
          <input
            type="email"
            className="px-12 py-4"
            id="password"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TfiEmail className="absolute top-5 left-5 text-lg " />
        </div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="relative ">
          <input
            type={seePassword == true ? "text" : "password"}
            className="px-12 py-4"
            id="password"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <CiLock className="absolute top-4 left-5 text-xl text-black" />
          <button
            className="cursor-pointer"
            onClick={() => setSeePassword(!seePassword)}
          >
            {seePassword ? (
              <LuEyeOff className="absolute top-5 right-10 text-lg " />
            ) : (
              <LuEye className="absolute top-5 right-10 text-lg " />
            )}
          </button>
        </div>

        <label htmlFor="confirm-password">Confirm Password</label>
        <div
          className="relative 
            "
        >
          <input
            type={seePassword == true ? "text" : "password"}
            className="px-12 py-4"
            id="password"
            placeholder="Create a password"
          />

          <CiLock className="absolute top-4 left-5 text-xl text-black" />
        </div>

        {/* remember / forget */}
        <div className="flex justify-between py-8">
          <div className="flex gap-2">
            <input type="checkbox" className="w-4" />
            <p>I agree to the Terms of Service and Privacy Policy</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-slate-100 bg-[#030213] py-4 rounded-xl"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default Signup;
