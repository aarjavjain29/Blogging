import { Navigate, Outlet} from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PrivateRouter() {
  const { currentUser } = useAuthContext();

  // const[currentUserOutlet ,setCurrentUserOutlet] = useOutletContext();

  return currentUser ? <Outlet/> : <Navigate to="/login"  replace={true}/>;
}

export default PrivateRouter;
