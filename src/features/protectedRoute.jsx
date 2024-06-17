import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isConnected } = useSelector((state) => state.connect);
  const connected = sessionStorage?.getItem("connected");
  const tokenSession = sessionStorage?.getItem("tokenSession");
  const connectionActive = (isConnected === true || (connected === "true" && tokenSession !== null));

  return connectionActive ? (<Outlet />) : (<Navigate to="/sign-in" />);
}

export default ProtectedRoute; 
