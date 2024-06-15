import {useState}  from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./style.css";
import homeIcon from "../assests/home.png";
import { Link } from "react-router-dom";
import { logOut } from "../utils/firebaseUtils";
import {useAuthContext } from "../contexts/AuthContext";

export default function Navbar() {

  const {currentUser} = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="navbar">
      <Link to={"/"}>
        <img src={homeIcon} alt="home-icon" />
      </Link>
      <h1>
        ──── <span> {"<Sule/>"}</span> Blog ────
      </h1>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <h3>{currentUser?.displayName}</h3>
        <AccountCircleIcon className="navbarButton" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currentUser ? (
          <div>
            <Link to={"/profile"} className="link">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to={"/newblog"} className="link">
              <MenuItem onClick={handleClose}>New</MenuItem>
            </Link>
            <Link to={"/"} className="link">
              <MenuItem onClick={handleClose && (() => logOut())}>
                Logout
              </MenuItem>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/login"} className="link">
              <MenuItem onClick={handleClose}>Login</MenuItem>
            </Link>
            <Link to={"/register"} className="link">
              <MenuItem onClick={handleClose}>Register</MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </header>
  );
}
