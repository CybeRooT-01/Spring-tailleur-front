/* eslint-disable react/prop-types */
const PageComponent = ({
  title,
  children,
  options,
  selectedOption,
  onOptionChange,
  EtatAjoutOrEdit,
  showSwitchButton,
}) => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {options && options.length > 0 && (
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedOption}
              onChange={onOptionChange}
              id="categoryType"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {showSwitchButton && (
            <div className="flex items-center">
              <span className="ml-3 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ajouter
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="switch"
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={EtatAjoutOrEdit}
                />
                <div className="w-11 h-6 bg-blue-800 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
              </label>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Modifier
              </span>
            </div>
          )}
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default PageComponent;
