import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaSearch, FaSignInAlt, FaUserTie } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "../types/types";
import logoimage from "../assets/web-images/logo.jpeg";
import { FiLogOut } from "react-icons/fi";
import { BiLogIn, BiLogOut } from "react-icons/bi";

interface HeaderPropTypes {
  user: User | null;
}

const Header = ({ user }: HeaderPropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      onClose();
      toast.success("Logout Successfully");
    } catch (error) {
      onClose();
      toast.error("Logout Failed Please Try Again Lated");
      throw error;
    }
  };
  return (
    <nav className="header">
      <img height={100} src={logoimage} alt="logo image" />
      <div>
        <Link onClick={onClose} to={"/"} aria-label="home page">
          Home
        </Link>
        <Link onClick={onClose} to={"/search"} aria-label="search page">
          Products
        </Link>

        {user?.role == "admin" ? (
          <Link to={"/admin/dashboard"} aria-label="admin page">
            Admin
          </Link>
        ) : (
          <Link onClick={onClose} to={"/orders"} aria-label="admin page">
            Orders
          </Link>
        )}
      </div>
      {/* IF USER LOGIN */}
      {/* ============= */}
      {user?._id ? (
        <div className="logoutButton">
          <Link onClick={onClose} to={"/cart"} aria-label="cart page">
            <FaCartPlus />
          </Link>
          <button title="Logout" onClick={logOutHandler}>
            <BiLogOut />
          </button>
        </div>
      ) : (
        <>
          {/* IF USER NOT LOGIN */}
          {/* ================= */}

          <div className="loginButton">
            <Link
              onClick={() => setIsRegisterOpen(false)}
              to={"/login"}
              title="Login"
              aria-label="login page"
            >
              <BiLogIn />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
