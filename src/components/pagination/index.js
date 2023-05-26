import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Pagination({ listnumber, rendersPaginationNamber }) {
  //   console.log(listnumber);
  const finishList = [];
  listnumber.map((item) => {
    if (item.data === "...") {
    } else {
      finishList.push(item);
    }
  });

  //   console.log(finishList);

  const checkList = [];
  let check = {};
  finishList.map((item) => {
    if (item.code === 1) {
      checkList.push(item);
      check = item;
    } else if (item.code - 1 !== check.code) {
      checkList.push(
        {
          code: item.code - 1,
          data: "...",
          selected: false,
        },
        item
      );
      check = item;
    } else {
      checkList.push(item);
      check = item;
    }
  });

  //   console.log(check);
  //   console.log(checkList);

  return (
    <div>
      <ul className="Pagination">
        {checkList.map((number) => {
          return (
            <li key={number.code} className="Pagination-number">
              {rendersPaginationNamber(number)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  listnumber: PropTypes.arrayOf(Number).isRequired,
  rendersPaginationNamber: PropTypes.func,
};

Pagination.defaultProps = {
  rendersPaginationNamber: (item) => {},
};

export default memo(Pagination);
