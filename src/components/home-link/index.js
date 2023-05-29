import React from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function HomeLink({ lang }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <a className="BasketTool-link" onClick={handleClick}>
      {lang === "Русский" ? "Главная" : "home"}
    </a>
  );
}

export default memo(HomeLink);
