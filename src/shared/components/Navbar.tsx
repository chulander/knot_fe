import { Link } from "react-router-dom";
import { KnotsLogo } from "./KnotsLogo";

export const Navbar = () => {
  return (
    <nav className="bg-green px-4 py-4 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <KnotsLogo/>
      </div>


      {/* Right Side - Login and Button */}
      <div className="flex space-x-4 items-center">
        <Link to="/login" className="text-gray-800 hover:text-black">Login</Link>
        <button onClick={()=>{
          window.location.href = 'https://www.knotapi.com/contact'

        }} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Schedule a Demo
        </button>
      </div>
    </nav>
  );
};
