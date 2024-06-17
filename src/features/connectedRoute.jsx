import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ConnectedRoute() {
  const { isConnected } = useSelector((state) => state.connect);
  const connected = sessionStorage?.getItem("connected");
  const disconnected = isConnected === false && connected !== "true";
  return disconnected ? <Outlet /> : <Navigate to="/profile" />;
}

export default ConnectedRoute;
