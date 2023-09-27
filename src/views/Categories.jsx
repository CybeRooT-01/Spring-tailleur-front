import { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "./axios";
import Pagination from "../components/Pagination";
import AddupdateCategorie from "../components/AddupdateCategorie";
import DeleteCategorie from "../components/DeleteCategorie";
import CategorieTr from "../components/CategorieTr";
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

  const options = [
    { label: "vente", value: "VENTE" },
    { label: "confection", value: "CONFECTION" },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setTypeCategorie(event.target.value);
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
          <AddupdateCategorie
            typeCategorie={typeCategorie}
            libelle={libelle}
            categories={categories}
            setLibelle={setLibelle}
            setIdToUpdate={setIdToUpdate}
            idToUpdate={idToUpdate}
            okDisabled={okDisabled}
            setOkDisabled={setOkDisabled}
            setCategories={setCategories}
            etat={etat}
          />

          <DeleteCategorie
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            setAllChecked={setAllChecked}
            categories={categories}
            setCategories={setCategories}
          />

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
                  categories
                    .slice(firstIndex, lastIndex)
                    .map((item, index) => (
                      <CategorieTr
                        key={index}
                        item={item}
                        index={index}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                        setAllChecked={setAllChecked}
                        categories={categories}
                        setIdToUpdate={setIdToUpdate}
                        setLibelle={setLibelle}
                        setIsDisabled={setIsDisabled}
                      />
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
