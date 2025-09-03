import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";

function Signin() {
  const [seePassword, setSeePassword] = useState(false);

  function handlePasswordVisibility() {
    setSeePassword(!seePassword);
  }

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <div className="relative ">
          <input
            type="email"
            className="px-12 py-4"
            id="password"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />

          <CiLock className="absolute top-5 left-5 text-lg " />
          <button className="cursor-pointer" onClick={handlePasswordVisibility}>
            {seePassword ? (
              <LuEyeOff className="absolute top-5 right-10 text-lg " />
            ) : (
              <LuEye className="absolute top-5 right-10 text-lg " />
            )}
          </button>
        </div>
        {/* remember / forget */}
        <div className="flex justify-between py-8">
          <div className="flex gap-2">
            <input type="checkbox" className="w-4" />
            <p>Remember me</p>
          </div>
          <p>Forget password?</p>
        </div>

        <button className="w-full text-slate-100 bg-[#030213] py-4 rounded-xl">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Signin;
