import { useLocation } from "react-router-dom";
import Header from "./Header";

const ConditionalHeader = () => {
  const location = useLocation();
  const noHeaderPaths = ["/login", "/signup"];

  return !noHeaderPaths.includes(location.pathname) ? <Header /> : null;
};

export default ConditionalHeader;
