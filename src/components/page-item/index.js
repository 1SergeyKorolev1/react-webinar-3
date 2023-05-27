import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageItem({ item, onAdd }) {
  const cn = bem("Page-item");
  const { id } = useParams();

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
  };

  if (item.description !== undefined) {
    return (
      <div className={cn()}>
        <p>{item.description}</p>
        <p>Страна производитель: {item.madeIn.title}</p>
        <p>Категория: {item.category.title}</p>
        <p>Год выпуска: {item.edition}</p>
        <p>Цена: {item.price}</p>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    );
  }
}

export default memo(PageItem);
