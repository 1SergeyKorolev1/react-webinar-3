import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Pagination({ listnumber, rendersPaginationNamber }) {
  //   console.log(listnumber);
  return (
    <div>
      <ul className="Pagination">
        {listnumber.map((number) => (
          <li key={number} className="Pagination-number">
            {rendersPaginationNamber(number)}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  listnumber: PropTypes.arrayOf(Number).isRequired,
  //   function: PropTypes.func,
};

// Pagination.defaultProps = {
//   function: (item) => {},
// };

export default memo(Pagination);
