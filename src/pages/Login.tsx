import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Welcome back</h2>

        <form>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Work Email"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="relative mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            <span className="absolute inset-y-0 right-3 flex cursor-pointer items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12h.01M19.07 4.93A10 10 0 1121.17 7M15 15l2.5 2.5M15 15l-2.5 2.5M15 15h.01"
                />
              </svg>
            </span>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-bold text-white hover:bg-gray-800">
            Continue
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-bold text-black">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
