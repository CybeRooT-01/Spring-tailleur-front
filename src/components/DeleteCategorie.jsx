import axiosClient from "../views/axios";
const DeleteCategorie = ({
  isDisabled,
  setIsDisabled,
  checkedItems,
  setCheckedItems,
  setAllChecked,
  categories,
  setCategories,
}) => {
  const supprimerCategorie = () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    const selectedIdInt = selectedIds.map((id) => parseInt(id));
    let data = {
      id: selectedIdInt,
    };
    axiosClient
      .delete("/categorie", { data })
      .then(() => {
        setCategories(
          categories.filter((item) => !selectedIdInt.includes(item.id))
        );
        setCheckedItems({});
        setIsDisabled(true);
        setAllChecked(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <div className="mb-6 mt-5 flex justify-between">
      <label className="block mb-2 text-lg font-medium text-gray-900 mt-3  dark:text-white">
        Liste des categories
      </label>
      <button
        type="button"
        className={`bg-red-700 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
        disabled={isDisabled}
        onClick={supprimerCategorie}
      >
        Supprimer
      </button>
    </div>
  );
};

export default DeleteCategorie;
