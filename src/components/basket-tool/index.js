import React from "react";
import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import { numberFormat, plural } from "../../utils";
import "./style.css";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  console.log(lang);

  return (
    <div className={cn()}>
      <a className="BasketTool-link" onClick={handleClick}>
        {lang === "Русский" ? "Главная" : "home"}
      </a>
      <div className="BasketTool-container">
        <span className={cn("label")}>
          {lang === "Русский" ? "В корзине" : "In the basket"}:
        </span>
        <span className={cn("total")}>
          {amount && lang === "Русский"
            ? `${amount} ${plural(amount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${numberFormat(sum)} ₽`
            : ""}
          {amount && lang === "English"
            ? `${amount} ${plural(amount, {
                one: "product",
                few: "products",
                many: "products",
              })} / ${numberFormat(sum)} ₽`
            : ""}
          {amount === 0 && lang === "Русский" ? "пусто" : ""}
          {amount === 0 && lang === "English" ? "empty" : ""}
        </span>
        <button onClick={onOpen}>
          {lang === "Русский" ? "Перейти" : "Go"}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
