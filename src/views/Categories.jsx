import { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "./axios";
import Pagination from "../components/Pagination";
const Categories = () => {
  const [etat, setEtat] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [libelle, setLibelle] = useState("");
  const [typeCategorie, setTypeCategorie] = useState("VENTE");
  const [idToUpdate, setIdToUpdate] = useState(0);
  const [okDisabled, setOkDisabled] = useState(false);
  const [dataLen, setDataLen] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(dataLen / recordsPerPage);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const checkAll = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const updatedCheckedItems = {};
    categories.forEach((item) => {
      updatedCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(updatedCheckedItems);
    if (isChecked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
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
  useEffect(() => {
    axiosClient
      .get("/categorie")
      .then((response) => {
        setCategories(response.data.reverse());
        setDataLen(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  const EtatAjoutOrEdit = () => {
    setEtat(!etat);
    setLibelle("");
    setIdToUpdate(0);
    setOkDisabled(false);
  };
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
  const ajouterOuModifier = () => {
    if (etat) {
      ajouterCategorie();
    } else {
      modifierCategorie();
    }
  };
  const chargerLibelle = (e) => {
    setIdToUpdate(e.target.id);
    setLibelle(e.target.innerHTML);
  };
  const options = [
    { label: "vente", value: "VENTE" },
    { label: "confection", value: "CONFECTION" },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setTypeCategorie(event.target.value);
  };
  const changeLibelle = (e) => {
    setLibelle(e.target.value);
    if (etat) {
      categories.find((item) => item.libelle === e.target.value)
        ? setOkDisabled(true)
        : setOkDisabled(false);
    }
  };
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
    <PageComponent
      title={"Categories"}
      options={options}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
      EtatAjoutOrEdit={EtatAjoutOrEdit}
      showSwitchButton={true}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="">
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
                okDisabled
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              onClick={ajouterOuModifier}
              disabled={okDisabled}
            >
              OK
            </button>
          </div>
          <div className="mb-6 mt-5 flex justify-between">
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-3  dark:text-white">
              Liste des categories
            </label>
            <button
              type="button"
              className={`bg-red-700 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              disabled={isDisabled}
              onClick={supprimerCategorie}
            >
              Supprimer
            </button>
          </div>
          <div className="mb-6 mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={allChecked}
                        onChange={checkAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Libelle
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!categories ? (
                  <>
                    {Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <tr key={index}>
                          <td colSpan="2" className="px-6 py-4">
                            <div
                              role="status"
                              className="animate-pulse flex items-center mb-2 mt-3"
                            >
                              <div className="h-5 w-[40px] min-w-4 mr-[100px] bg-gray-500 rounded-md"></div>
                              <div className="h-5 w-[960px] bg-gray-500 rounded-md"></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </>
                ) : (
                  categories.slice(firstIndex, lastIndex).map((item, index) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <Pagination
          currentPage={currentPage}
          npage={npage}
          changeCPage={changeCPage}
          prePage={prePage}
          nextPage={nextPage}
        />
      </div>
    </PageComponent>
  );
};
export default Categories;
