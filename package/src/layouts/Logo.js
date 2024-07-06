import LinkmoaLogo from "../views/linkmoa_logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LinkmoaLogo} alt="Linkmoa Logo" height="45px" />
    </Link>
  );
};

export default Logo;
