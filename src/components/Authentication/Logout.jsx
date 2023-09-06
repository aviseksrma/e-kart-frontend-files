import { useEffect } from "react";
import { logout } from "../../services/userServices";

function Logout() {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
