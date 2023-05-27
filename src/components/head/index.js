import { memo } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title }) {
  console.log(title);
  if (title !== undefined) {
    return (
      <div className="Head">
        <h1>{title}</h1>
      </div>
    );
  }
}

// Head.propTypes = {
//   title: PropTypes.node,
// };

export default memo(Head);
