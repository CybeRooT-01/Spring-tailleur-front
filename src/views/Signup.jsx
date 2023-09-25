import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClientSansTOken from "./axiosNoToken";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate();
  const onsubmit = (event) => {
    event.preventDefault();
    setError({ __html: "" });
    axiosClientSansTOken
      .post("/inscription", {
        nom: fullName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/activate");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-700">
        Creez Votre Compte
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onsubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium leading-6  text-gray-900"
            >
              Nom Complet
            </label>
            <div className="mt-2">
              <input
                placeholder="nom complet"
                id="nom"
                name="nom"
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6  text-gray-900"
            >
              Addresse Email
            </label>
            <div className="mt-2">
              <input
                placeholder="email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6   text-gray-900"
              >
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                placeholder="mot de passe"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Inscription
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm ">
          Deja membre ?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Connectez vous a votre compte
          </Link>
        </p>
      </div>
    </>
  );
}
