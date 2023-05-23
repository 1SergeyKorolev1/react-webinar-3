import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);
  // console.log(props.check);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAddInBasket: (e) => {
      e.stopPropagation();
      props.onAddInBasket(props.item);
    },
    onDeleteInBasket: (e) => {
      e.stopPropagation();
      props.onDeleteInBasket(props.item);
    },
  };

  if (props.check) {
    return (
      <div
        className="Item"
        // className={"Item" + (props.item.selected ? " Item_selected" : "")}
        // onClick={callbacks.onClick}
      >
        <div className="Item-code">{props.item.code}</div>
        <div className="Item-title">
          {props.item.title}{" "}
          {/* {count
            ? ` | Выделяли ${count} ${plural(count, {
                one: "раз",
                few: "раза",
                many: "раз",
              })}`
            : ""} */}
        </div>

        <div className="Item-price">
          {`${new Intl.NumberFormat("ru-RU").format(props.item.price)}`} &#8381;
        </div>
        <div className="Item-quantity">{`${props.item.quantity} шт.`}</div>
        <div className="Item-actions">
          <button onClick={callbacks.onDeleteInBasket}>Удалить</button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="Item"
        // className={"Item" + (props.item.selected ? " Item_selected" : "")}
        // onClick={callbacks.onClick}
      >
        <div className="Item-code">{props.item.code}</div>
        <div className="Item-title">
          {props.item.title}{" "}
          {/* {count
            ? ` | Выделяли ${count} ${plural(count, {
                one: "раз",
                few: "раза",
                many: "раз",
              })}`
            : ""} */}
        </div>
        <div className="Item-price">
          {`${new Intl.NumberFormat("ru-RU").format(props.item.price)}`} &#8381;
        </div>
        <div className="Item-actions">
          <button onClick={callbacks.onAddInBasket}>Добавить</button>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  price: PropTypes.number,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
