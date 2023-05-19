import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onDeleteItem, onSelectItem, onAddInBasket }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onDelete={onDeleteItem}
            onAddInBasket={onAddInBasket}
            onSelect={onSelectItem}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddInBasket: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onAddInBasket: () => {},
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
