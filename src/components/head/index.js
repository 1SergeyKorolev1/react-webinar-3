import { memo } from "react";
import { Navigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
// import { useLocation } from "react-router-dom";

function Head({ title, onChoiceLang, lang }) {
  // let location = useLocation();
  const cn = bem("Head");
  // const thisLocation = location.pathname.split("").slice(0, 4).join("");
  // console.log(thisLocation === "/to/");
  if (title !== undefined) {
    if (lang === "English") {
      return (
        <div className={cn()}>
          <h1>{title}</h1>
          <select className={cn("select")} onChange={onChoiceLang}>
            <option>Русский</option>
            <option selected defaultValue={"English"}>
              English
            </option>
          </select>
        </div>
      );
    } else {
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
}

// Head.propTypes = {
//   title: PropTypes.node,
// };

export default memo(Head);
