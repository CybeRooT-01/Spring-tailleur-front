import axiosClient from "../views/axios";

const ArticleConfTr = ({
    article,
    articleConf,
    setModifier,
    setIdToUpdate,
    setAfficherFournisseurAvecValue,
    setAfficherFournisseurSansValue,
    setFournisseurNew,
    setLibelle,
    setPrix,
    setStock,
    setCategorieToSend,
    setReference,
    setImage,
    setListeFournisseur,
    setArticleConf,
    libelleRef,
    prixRef,
    stockRef,
}) => {
      const mettreFocus = () => {
        if (libelleRef.current && prixRef.current) {
          libelleRef.current.focus();
        }
        setTimeout(() => {
          prixRef.current.focus();
        }, 100);

        setTimeout(() => {
          stockRef.current.focus();
        }, 200);
      };
      const supprimerArticle = (id) => () => {
        console.log(id);
        axiosClient
          .delete("/articleConf/" + id)
          .then((response) => {
            console.log(response);
            let article = articleConf.find((item) => item.id === id);
            articleConf.splice(articleConf.indexOf(article), 1);
            setArticleConf([...articleConf]);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const chargerDonnees = (e) => {
        setModifier(true);
        let id = parseInt(e.target.id);
        setIdToUpdate(id);
        let articleAmodifier = articleConf.find((item) => item.id === id);
        const fournisseurNews = articleAmodifier.fournisseurs.map(
          (fournisseur) => ({
            value: fournisseur.id,
            label: fournisseur.nom,
          })
        );
        console.log(articleAmodifier);
        setAfficherFournisseurAvecValue(true);
        setAfficherFournisseurSansValue(false);
        setFournisseurNew(fournisseurNews);
        setLibelle(articleAmodifier.libelle);
        setPrix(articleAmodifier.prix);
        setStock(articleAmodifier.stock);
        setCategorieToSend(articleAmodifier.categories);
        setReference(articleAmodifier.reference);
        setImage(articleAmodifier.image);
        setListeFournisseur(articleAmodifier.fournisseurs);
        // console.log(fournisseurNews);
        mettreFocus();
      };
  return (
    <tr
      key={article.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {article.libelle}
      </th>
      <td className="px-6 py-4">{article.prix}</td>
      <td className="px-6 py-4">{article.stock}</td>
      <td className="px-6 py-4">{article.categories.libelle}</td>
      <td className="px-6 py-4">
        <button
          onClick={chargerDonnees}
          type="button"
          id={article.id}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Modifier
        </button>
        <button
          onClick={supprimerArticle(article.id)}
          id={article.id}
          className="w-[100px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          supprimer
        </button>
      </td>
    </tr>
  );
}

export default ArticleConfTr