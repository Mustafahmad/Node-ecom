import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoimage from "../assets/web-images/logo.jpeg";
import { auth } from "../firebase";
import { User } from "../types/types";
import {
  RiLogoutBoxLine as Login,
  RiLogoutBoxRLine as Logout,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { StoreRootState } from "../redux/store/store";

interface HeaderPropTypes {
  user: User | null;
}

const Header = ({ user }: HeaderPropTypes) => {
  const { cartItem } = useSelector(
    (state: StoreRootState) => state.cartReducer
  );
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Logout Failed Please Try Again Lated");
      throw error;
    }
  };
  return (
    <nav className="header">
      <img height={100} src={logoimage} alt="logo image" />
      <div>
        <Link to={"/"} aria-label="home page">
          Home
        </Link>
        <Link to={"/search"} aria-label="search page">
          Products
        </Link>

        {user?.role == "admin" ? (
          <Link to={"/admin/dashboard"} aria-label="admin page">
            Admin
          </Link>
        ) : (
          <Link to={"/orders"} aria-label="admin page">
            Orders
          </Link>
        )}
      </div>
      {/* IF USER LOGIN */}
      {/* ============= */}
      {user?._id ? (
        <div className="logoutButton">
          <div className="cartDiv">
            <Link to={"/cart"} aria-label="cart page">
              <FaCartPlus />
            </Link>
            {cartItem?.length > 0 && <span>{cartItem.length}</span>}
          </div>
          <button title="Logout" onClick={logOutHandler}>
            <Logout />
          </button>
        </div>
      ) : (
        <>
          {/* IF USER NOT LOGIN */}
          {/* ================= */}

          <div className="loginButton">
            <Link to={"/login"} title="Login" aria-label="login page">
              <Login />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
