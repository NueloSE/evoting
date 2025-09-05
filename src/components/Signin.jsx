import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { signInEmailPassword } from "../server/backend";

function Signin() {
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null);

  function handlePasswordVisibility() {
    setSeePassword(!seePassword);
  }

  function handleSignIn (e, email, password) {
    e.preventDefault();
    signInEmailPassword(email, password)
  }

  return (
    <form onSubmit={(e) => handleSignIn(e, email, password)}>
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
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" className="w-full text-slate-100 bg-[#030213] py-4 rounded-xl">
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Signin;
