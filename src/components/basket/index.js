import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function Basket({
  price,
  isOpen,
  list,
  onDeleteItem,
  onSelectItem,
  title,
  setExit,
  onDeleteInBasket,
}) {
  const check = true;
  // console.log(isOpen);
  return (
    <div className={`Overlay ${isOpen ? "Overlay-open" : ""}`}>
      <div className="Basket">
        <div className="Basket-Head">
          <h2>{title}</h2>
          <button className="Basket-exit" onClick={setExit}>
            Закрыть
          </button>
        </div>
        {list.map((item) => (
          <div key={item.code} className="List-item">
            <Item
              item={item}
              onDelete={onDeleteItem}
              onSelect={onSelectItem}
              check={check}
              onDeleteInBasket={onDeleteInBasket}
            />
          </div>
        ))}
        <div className="total-container">
          <div className="Bascet-price">{price} ₽</div>
          <p className="Bascet-total">И того</p>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

Basket.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(Basket);
