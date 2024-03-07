import React from "react";

function Login() {


  
  return (
    <>
      <div className="login-container bg-black text-white min-h-screen flex items-center">
        <div className="login-card   mx-auto h-[90vh] w-[40vw] bg-black-50 rounded-lg bg-[url('https://img.freepik.com/premium-photo/gorgeous-brunette-female-with-long-braids-doing-squats-using-barbell-side-view_944525-4104.jpg')] bg-cover bg-none-reapet">
          <h2 className=" login-header text-3xl font-bold mb-4 ">
            WELCOME BACK
          </h2>
          <form className="login-box flex flex-col items-center bg-black-50">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-neon-50 hover:bg-green-600 px-4 py-2 rounded-md text-black-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
