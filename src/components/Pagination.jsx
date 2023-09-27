// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, npage, changeCPage, prePage, nextPage }) => {
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="flex">
        <li className="page-item">
          <button
            onClick={prePage}
            className="px-3 py-1 border rounded-md text-gray-700 border-gray-300  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Prev
          </button>
        </li>
        {numbers.map((number, index) => (
          <li key={index}>
            <button
              onClick={() => changeCPage(number)}
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-black"
                  : "text-gray-700"
              } px-3 py-1 border rounded-md border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={nextPage}
            className="px-3 py-1 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
