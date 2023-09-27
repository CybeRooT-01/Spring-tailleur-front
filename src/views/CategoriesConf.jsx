// import InputLibelle from "../components/InputLibelle";
import InputLibelle from "../components/InputLibelle";
import PageComponent from "../components/PageComponent";

const CategoriesConf = () => {
  return (
    <PageComponent title={"Categories de confection"} showSwitchButton={true}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md">

          <div className="mb-6 mt-5 flex justify-between">
            <div className="w-1/2 pl-[100px]">
              <InputLibelle libelle="Libelle" />
              <InputLibelle libelle="prix" />
              <InputLibelle libelle="Stock" />
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className="w-1/2 text-right">Contenu à droite</div>
          </div>
      </div>
    </PageComponent>
  );
};

export default CategoriesConf;
