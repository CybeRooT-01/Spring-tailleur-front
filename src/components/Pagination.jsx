// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, npage, changeCPage, prePage, nextPage }) => {
  const numbers = [...Array(npage + 1).keys()].slice(1);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>
        {numbers.map((number, index) => (
          <li
            key={index}
            className={"page-item " + (currentPage === number ? "active" : "")}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => changeCPage(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
