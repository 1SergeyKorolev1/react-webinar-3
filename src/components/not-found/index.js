import { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="NotFound">
      <h1>404</h1>
      <p>Такой страницци не существует</p>
      <button className="NotFound-button" onClick={handleClick}>
        назад
      </button>
    </div>
  );
}

export default memo(NotFound);
