import { memo } from "react";
import { Navigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, onChoiceLang }) {
  const cn = bem("Head");
  // console.log(title);
  if (title !== undefined) {
    return (
      <div className={cn()}>
        <h1>{title}</h1>
        <select className={cn("select")} onChange={onChoiceLang}>
          <option>Русский</option>
          <option>English</option>
        </select>
      </div>
    );
  }
}

// Head.propTypes = {
//   title: PropTypes.node,
// };

export default memo(Head);
