// src/components/Navbar.jsx
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ onAddUser , type}) => {
  return (
    <nav className="bg-black text-white p-6">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg cursor-pointer">
          User Management App
        </Link>

        {
          type === false ? (
            <button
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
              onClick={onAddUser}
            >
            <Plus size={15}/> Add User
            </button>
          ) : (
            ""
          )
        }

        
      </div>
    </nav>
  );
};

export default Navbar;
