import Select from "react-select";
const FormArticleConf = ({
  libelle,
  setLibelle,
  prix,
  setPrix,
  stock,
  setStock,
  categorie,
  fournisseur,
  categorieToSend,
  fournisseurNew,
  libelleRef,
  prixRef,
  stockRef,
  setCategorieToSend,
  setReference,
  setFournisseurNew,
  setListeFournisseur,
  fournisseursToSend,
  afficherFournisseurAvecValue,
  afficherFournisseurSansValue,
  modifier,
  listeFournisseur,
  onsubmit,
}) => {

  const isFormValid = () => {
    return libelle && prix && stock && categorie && listeFournisseur;
  };
  const findFournisseurByName = (e) => {
    console.log(e);
    let fournisseurIds = e.map((item) => parseInt(item.value));
    let fournisseursNoMapped = fournisseursToSend.filter((item) =>
      fournisseurIds.includes(item.id)
    );
    setListeFournisseur(fournisseursNoMapped);
    if (modifier) {
      if (fournisseurNew) {
        setFournisseurNew(e);
      }
    }
  };
  const findCategorieById = (e) => {
    let categoriToSend = categorie.find(
      (item) => item.id === parseInt(e.target.value)
    );
    if (!categoriToSend) {
      setReference("");
      return;
    }
    setCategorieToSend(categoriToSend);
    setReference("REF-" + categoriToSend.libelle.toUpperCase() + "-1");
  };

  return (
    <>
      <form onSubmit={onsubmit}>
        <div className="w-1/2 pl-[100px]">
          <div className="relative mb-7">
            <input
              ref={libelleRef}
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-[420px] text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={libelle}
              onChange={(e) => {
                setLibelle(e.target.value);
              }}
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Libelle
            </label>
          </div>
          <div className="relative mb-7">
            <input
              ref={prixRef}
              placeholder=""
              type="text"
              value={prix}
              onChange={(e) => {
                setPrix(
                  typeof e.target.value === "string"
                    ? e.target.value.replace(/[^0-9]/g, "")
                    : parseInt(e.target.value)
                );
              }}
              className="block px-2.5 pb-2.5 pt-4 w-[420px] text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Prix
            </label>
          </div>
          <div className="relative mb-7">
            <input
              ref={stockRef}
              value={stock}
              onChange={(e) => {
                setStock(
                  typeof e.target.value === "string"
                    ? e.target.value.replace(/[^0-9]/g, "")
                    : parseInt(e.target.value)
                );
              }}
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-[420px] text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />

            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Stock
            </label>
          </div>
          <select
            id="categorie"
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[420px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={findCategorieById}
            value={categorieToSend && categorieToSend.id}
          >
            <option>Selectionnez un option</option>
            {categorie &&
              categorie.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.libelle}
                </option>
              ))}
          </select>
          {afficherFournisseurAvecValue && (
            <Select
              className="w-[420px]"
              closeMenuOnSelect={false}
              options={fournisseur}
              isMulti
              value={fournisseurNew}
              onChange={findFournisseurByName}
            />
          )}
          {afficherFournisseurSansValue && (
            <Select
              className="w-[420px]"
              closeMenuOnSelect={false}
              options={fournisseur}
              isMulti
              onChange={findFournisseurByName}
            />
          )}

          <button
            type="submit"
            className={`mt-2 text-white ${
              isFormValid()
                ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                : "bg-blue-300 cursor-not-allowed"
            } font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            disabled={!isFormValid()}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </>
  );
};

export default FormArticleConf;
