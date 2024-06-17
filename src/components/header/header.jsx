import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Slices/signInSlices";
import { removeIdentity } from "../../Slices/logInSlice";
import { removeUserInfo } from "../../Slices/userInfoSlice";


function Header() {
  const navigate = useNavigate();
  const { isConnected } = useSelector((state) => state.connect);
  const dispatch = useDispatch();
  let connected = sessionStorage.getItem("connected");
  let { userName } = useSelector((state) => state.userInfo);
  if (!userName) {
    userName = window.sessionStorage.getItem("userName");
  }

  const handleLogOut = () => {
    window.sessionStorage.clear();
    dispatch(removeIdentity());
    dispatch(removeUserInfo());
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/assets/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-items">
        {(isConnected === true  || connected === "true") ? (
          <>
            <NavLink className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {userName}
            </NavLink>
            <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
