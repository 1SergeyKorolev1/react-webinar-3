import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageItem({ item, onAdd, lang }) {
  const navigate = useNavigate();
  const basketTool = document.querySelector(".BasketTool-total");
  if (basketTool !== null) {
    if (basketTool.textContent === "") {
      navigate("/");
      location.reload();
    }
  }

  const cn = bem("Page-item");
  const { id } = useParams();

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
  };

  if (item.description !== undefined) {
    return (
      <div className={cn()}>
        <p className={cn("description")}>{item.description}</p>
        <p className={cn("description")}>
          Страна производитель:{" "}
          <span className={cn("country")}>{item.madeIn.title}</span>
        </p>
        <p className={cn("description")}>
          Категория:{" "}
          <span className={cn("country")}>{item.category.title}</span>
        </p>
        <p className={cn("description")}>
          Год выпуска: <span className={cn("country")}>{item.edition}</span>
        </p>
        <p className={cn("price")}>Цена: {item.price}</p>
        <button className={cn("button")} onClick={callbacks.onAdd}>
          {lang === "Русский" ? "Добавить" : "Add"}
        </button>
      </div>
    );
  }
}

export default memo(PageItem);
