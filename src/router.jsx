import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Categories from "./views/Categories";
import Login from "./views/Login";
import Signup from "./views/Signup";
import CategoriesConf from "./views/CategoriesConf";
import CategorieVente from "./views/CategorieVente";
import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/DashboardLayout";
import Activation from "./views/Activation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categoriesConfection",
        element: <CategoriesConf />,
      },
      {
        path: "/categoriesVente",
        element: <CategorieVente />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/activate",
        element: <Activation/>
      },
    ],
  },
]);
export default router;
