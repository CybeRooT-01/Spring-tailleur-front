import { useEffect, useState, useRef } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "./axios";
import Pagination from "../components/Pagination";
import FormArticleConf from "../components/FormArticleConf";
import UploadImage from "../components/UploadImage";
import ArticleConfTr from "../components/ArticleConfTr";
const CategoriesConf = () => {
  const [fournisseur, setFournisseur] = useState();
  const [fournisseursToSend, setFournisseursToSend] = useState();
  const [categorieToSend, setCategorieToSend] = useState({});
  const [categorie, setCategorie] = useState("");
  const [libelle, setLibelle] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [listeFournisseur, setListeFournisseur] = useState();
  const [reference, setReference] = useState("");
  const [articleConf, setArticleConf] = useState();
  const [modifier, setModifier] = useState(false);
  useEffect(() => {
    axiosClient
      .get("/categorie/confection")
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [idToUpdate, setIdToUpdate] = useState(0);
  const modifierArticle = () => {
    let data = {
      libelle: libelle,
      prix: parseInt(prix),
      stock: parseInt(stock),
      categories: categorieToSend,
      image: image,
      fournisseurs: listeFournisseur,
      reference: reference,
    };
    axiosClient
      .put(`/articleConf/${idToUpdate}`, data)
      .then((response) => {
        console.log(response);
        let article = articleConf.find((item) => item.id === response.data.id);
        article.libelle = response.data.libelle;
        article.prix = response.data.prix;
        article.stock = response.data.stock;
        article.categories = response.data.categories;
        article.image = response.data.image;
        article.fournisseurs = response.data.fournisseurs;
        article.reference = response.data.reference;
        setArticleConf([...articleConf]);
        setLibelle("");
        setPrix("");
        setStock("");
        setCategorieToSend({});
        setImage("");
        setListeFournisseur();
        setReference("");
        setIdToUpdate(0);
        setModifier(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axiosClient
      .get("/fournisseur")
      .then((response) => {
        const fournisseur = response.data.map((fournisseur) => ({
          value: fournisseur.id,
          label: fournisseur.nom,
        }));
        setFournisseursToSend(response.data);
        setFournisseur(fournisseur);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axiosClient
      .get("/articleConf")
      .then((response) => {
        setArticleConf(response.data.reverse());
        setDataLen(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();
    if (modifier) {
      modifierArticle();
      return;
    }
    let data = {
      libelle: libelle,
      prix: parseInt(prix),
      stock: parseInt(stock),
      categories: categorieToSend,
      image: image,
      fournisseurs: listeFournisseur,
      reference: reference,
    };
    axiosClient
      .post("/articleConf", data)
      .then((response) => {
        console.log(response);
        setArticleConf([response.data, ...articleConf]);
        setLibelle("");
        setPrix("");
        setStock("");
        setCategorieToSend({});
        setImage("");
        setListeFournisseur();
        setReference("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const libelleRef = useRef(null);
  const prixRef = useRef(null);
  const stockRef = useRef(null);
  const [fournisseurNew, setFournisseurNew] = useState([]);
  const [afficherFournisseurAvecValue, setAfficherFournisseurAvecValue] =
    useState(false);
  const [afficherFournisseurSansValue, setAfficherFournisseurSansValue] =
    useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [dataLen, setDataLen] = useState(0);
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
  return (
    <PageComponent title={"Articles de confection"} showSwitchButton={false}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md">
        <div className=" mt-5 flex justify-between">
          <FormArticleConf
            libelle={libelle}
            setLibelle={setLibelle}
            prix={prix}
            setPrix={setPrix}
            stock={stock}
            setStock={setStock}
            categorie={categorie}
            fournisseur={fournisseur}
            categorieToSend={categorieToSend}
            fournisseurNew={fournisseurNew}
            libelleRef={libelleRef}
            prixRef={prixRef}
            stockRef={stockRef}
            setCategorieToSend={setCategorieToSend}
            setReference={setReference}
            setFournisseurNew={setFournisseurNew}
            setListeFournisseur={setListeFournisseur}
            fournisseursToSend={fournisseursToSend}
            afficherFournisseurAvecValue={afficherFournisseurAvecValue}
            afficherFournisseurSansValue={afficherFournisseurSansValue}
            modifier={modifier}
            listeFournisseur={listeFournisseur}
            onsubmit={onsubmit}
          />
          <UploadImage
            image={image}
            setImage={setImage}
            reference={reference}
          />
          <div className="relative overflow-x-auto"></div>
        </div>
        <table className="w-[1170px] text-sm text-left text-gray-500 dark:text-gray-400 ml-20">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                Prix
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Categorie
              </th>
              <th scope="col" className="px-6 py-3 pl-[100px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articleConf &&
              articleConf.slice(firstIndex, lastIndex).map((article) => (
                <ArticleConfTr
                  key={article.id}
                  article={article}
                  articleConf={articleConf}
                  setModifier={setModifier}
                  setIdToUpdate={setIdToUpdate}
                  setAfficherFournisseurAvecValue={
                    setAfficherFournisseurAvecValue
                  }
                  setAfficherFournisseurSansValue={
                    setAfficherFournisseurSansValue
                  }
                  setFournisseurNew={setFournisseurNew}
                  setLibelle={setLibelle}
                  setPrix={setPrix}
                  setStock={setStock}
                  setCategorieToSend={setCategorieToSend}
                  setReference={setReference}
                  setImage={setImage}
                  setListeFournisseur={setListeFournisseur}
                  setArticleConf={setArticleConf}
                  libelleRef={libelleRef}
                  prixRef={prixRef}
                  stockRef={stockRef}
                />
              ))}
          </tbody>
        </table>
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

export default CategoriesConf;
