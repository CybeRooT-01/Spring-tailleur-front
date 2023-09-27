const CategorieTr = ({
  index,
  item,
  checkedItems,
  setCheckedItems,
  setAllChecked,
  categories,
  setIdToUpdate,
  setLibelle,
  setIsDisabled,
}) => {
  const getChecked = (e) => {
    const itemId = e.target.id;
    const isChecked = e.target.checked;
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[itemId] = isChecked;
    setCheckedItems(updatedCheckedItems);
    const selectedIds = Object.keys(updatedCheckedItems).filter(
      (key) => updatedCheckedItems[key]
    );
    if (selectedIds.length === categories.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    if (selectedIds.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const chargerLibelle = (e) => {
    setIdToUpdate(e.target.id);
    setLibelle(e.target.innerHTML);
  };
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="animate-pulse"></div>
          <input
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            id={item.id}
            checked={checkedItems[item.id] || false}
            onChange={getChecked}
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        <span
          className="cursor-pointer text-gray-600"
          onClick={chargerLibelle}
          id={item.id}
        >
          {item.libelle}
        </span>
      </td>
    </tr>
  );
};

export default CategorieTr;
