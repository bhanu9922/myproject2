import React from "react";

const Login = () => {
  return (
    <div className="w-screen h-screen bg-green-100 flex items-center justify-center">
      <div className="w-[70%] h-[70%] flex">
        <div className="flex flex-col justify-center" style={{ flex: 1 }}>
          <h1 className="font-extrabold text-3xl text-green-600">
            Solu Social
          </h1>
          <span className="text-lg font-semibold">
            Connect With Friends On Solu Social.
          </span>
        </div>
        <div className="flex flex-col justify-center" style={{ flex: 1 }}>
          <div className="bg-white h-[300px] p-[20px] rounded-md flex flex-col justify-between shadow-lg">
   
            <input
              type="email"
              placeholder="email"
              className="h-[50px] rounded-md border border-gray-200 text-lg p-[20px] focus:outline-none"
            />
            <input
              type="password"
              placeholder="password"
              className="h-[50px] rounded-md border border-gray-200 text-lg p-[20px] focus:outline-none"
            />
            <button className="h-[50px] rounded-lg bg-green-600 hover:bg-green-700 transition text-white text-lg font-bold">
            Login
            </button>
            <span className="text-center text-green-600 cursor-pointer">forgot password?</span>
            <button className="h-[50px] w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-bold self-center">
              Create A New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;