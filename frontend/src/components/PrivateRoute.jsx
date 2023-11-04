import { Navigate, Outlet } from "react-router-dom";
import { useUserCtx } from "../context/userCtx";

export default function PrivateRoute() {
  const { userState } = useUserCtx();

  return userState?.currentUser ? <Outlet /> : <Navigate to='/sign-in'/>;
}
