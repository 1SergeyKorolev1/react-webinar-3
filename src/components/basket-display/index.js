import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function BasketDisplay({ price, productList, setOpen, quantity }) {
  // console.log(quantity);
  if (price === 0) {
    return (
      <div className="Basket-Display">
        <button className="Basket-Display__button" onClick={setOpen}>
          Открыть
        </button>
        <p className="Basket-Display__title_style-two">пусто</p>
        <p className="Basket-Display__title_style-one">В корзине:</p>
      </div>
    );
  }
  return (
    <div className="Basket-Display">
      <button className="Basket-Display__button" onClick={setOpen}>
        Открыть
      </button>
      <p className="Basket-Display__title_style-two">{price}</p>
      <p className="Basket-Display__title_style-two">
        {productList.length}{" "}
        {plural(quantity, {
          one: "товар",
          few: "товара",
          many: "товаров",
        })}{" "}
        /
      </p>
      <p className="Basket-Display__title_style-one">В корзине:</p>
    </div>
  );
}

BasketDisplay.propTypes = {
  price: PropTypes.node,
};

export default React.memo(BasketDisplay);
