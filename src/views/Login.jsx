import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClientSansTOken from "./axiosNoToken";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken, setCurrentUser } = UseStateContext();
  const onsubmit = (event) => {
    event.preventDefault();
    axiosClientSansTOken
      .post("/connexion", {
        username: email,
        password: password,
      })
      .then(({ data }) => {
        console.log(data);
        setUserToken(data.token);
        setCurrentUser(data.user)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-blue-700">
        Connectez vous
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
                value={email}
                onChange={(event) => {
                  setemail(event.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm ">
          Pas de compte ?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Creer votre compte
          </Link>
        </p>
      </div>
    </>
  );
}
