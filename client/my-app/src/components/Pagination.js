import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item" key={number}>
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
