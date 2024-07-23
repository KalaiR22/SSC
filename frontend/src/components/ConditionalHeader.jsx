import { useLocation } from "react-router-dom";
import Header from "./Header";

const ConditionalHeader = () => {
  const location = useLocation();

  // Define the paths where the header should not be shown
  const excludedPaths = [
    "/login",
    "/signup",
    "/dashboard",
    "/forgetpassword",
    // You can also use a regular expression to exclude dynamic paths
  ];

  // Check if the current path is exactly in the excludedPaths array
  const isExcludedPath = excludedPaths.includes(location.pathname);

  // Check if the current path matches the dynamic pattern for forgetpassword with a token
  const isForgetPasswordWithToken =
    location.pathname.startsWith("/forgetpassword/") &&
    location.pathname !== "/forgetpassword";

  // Render the Header only if the path is not excluded
  return !isExcludedPath && !isForgetPasswordWithToken ? <Header /> : null;
};

export default ConditionalHeader;
