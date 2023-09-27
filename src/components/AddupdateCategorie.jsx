import axiosClient from "../views/axios";

const AddupdateCategorie = ({
  typeCategorie,
  setCategories,
  categories,
  setLibelle,
  libelle,
  setIdToUpdate,
  idToUpdate,
  okDisabled,
  setOkDisabled,
  etat
}) => {
  const ajouterCategorie = () => {
    let data = {
      libelle: libelle,
      typeCategorie: typeCategorie,
    };
    axiosClient
      .post("/categorie", data)
      .then((response) => {
        setCategories([response.data, ...categories]);
        setLibelle("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  const modifierCategorie = () => {
    let id = idToUpdate;
    let data = {
      libelle: libelle,
      typeCategories: typeCategorie,
    };
    axiosClient
      .put(`/categorie/${id}`, data)
      .then((response) => {
        let categorie = categories.find((item) => item.id === response.data.id);
        categorie.libelle = response.data.libelle;
        categorie.typeCategorie = response.data.typeCategorie;
        setCategories([...categories]);
        setLibelle("");
        setIdToUpdate(0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  const changeLibelle = (e) => {
    setLibelle(e.target.value);
    if (etat) {
      categories.find((item) => item.libelle === e.target.value)
        ? setOkDisabled(true)
        : setOkDisabled(false);
    }
  };
  const ajouterOuModifier = () => {
    if (etat) {
      ajouterCategorie();
    } else {
      modifierCategorie();
    }
  };
  return (
    <div className="mb-6 mt-5 flex justify-between">
      <label className="block mb-2 text-lg font-medium text-gray-900 mt-3  dark:text-white">
        Libelle de la categorie
      </label>
      <input
        type="text"
        id="default-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Libelle de la categorie"
        value={libelle}
        onChange={(e) => changeLibelle(e)}
      />
      <button
        type="button"
        className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
          okDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
        onClick={ajouterOuModifier}
        disabled={okDisabled}
      >
        OK
      </button>
    </div>
  );
};

export default AddupdateCategorie;
