import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function LoginNavigate({ name, t, onClockExit }) {
  // console.log(name);
  if (name) {
    return (
      <div className="Login-navigate">
        <Link onClick={onClockExit} className="Login-navigate-button">
          {t("Exit")}
        </Link>
        <Link to={"/profile"} className="Login-navigate-profile">
          {name}
        </Link>
      </div>
    );
  } else {
    return (
      <div className="Login-navigate">
        <Link to={"/login"} className="Login-navigate-button">
          {t("Entry")}
        </Link>
      </div>
    );
  }
}

// Head.propTypes = {
//   user: PropTypes.node,
// };

export default memo(LoginNavigate);
