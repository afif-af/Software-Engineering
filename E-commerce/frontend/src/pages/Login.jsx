import React, { useState } from "react";

const Login = () => {
  const [currentState, setcurrentState] = useState("Sign up");
  const [forgotPassword, setForgotPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (forgotPassword) {
      // Send reset email / OTP API
      console.log("Password reset request");
      return;
    }

    // Login / Signup API
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >

      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {forgotPassword ? "Reset Password" : currentState}
        </p>

        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {forgotPassword ? (
        <>
          <p className="text-sm text-gray-500 text-center">
            Enter your email address and we'll send you a password reset link.
          </p>

          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />

          <button
            type="submit"
            className="cursor-pointer bg-black text-white font-light px-8 py-2 mt-4"
          >
            SEND RESET LINK
          </button>

          <p
            onClick={() => setForgotPassword(false)}
            className="cursor-pointer text-sm"
          >
            Back to Login
          </p>
        </>
      ) : (
        <>
          {currentState === "Login" ? null : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              required
            />
          )}

          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />

          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">

            {currentState === "Login" && (
              <p
                onClick={() => setForgotPassword(true)}
                className="cursor-pointer"
              >
                Forgot your password?
              </p>
            )}

            {currentState === "Login" ? (
              <p
                onClick={() => setcurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setcurrentState("Login")}
                className="cursor-pointer"
              >
                Login Here
              </p>
            )}

          </div>

          <button
            type="submit"
            className="cursor-pointer bg-black text-white font-light px-8 py-2 mt-4"
          >
            {currentState === "Login" ? "SIGN IN" : "SIGN UP"}
          </button>
        </>
      )}

    </form>
  );
};

export default Login;