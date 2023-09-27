import axiosClientSansTOken from "./axiosNoToken";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Activation() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const onsubmit = (event) => {
    event.preventDefault();

    axiosClientSansTOken
      .post("/activation", {
        code: code,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-blue-700">
        Activez votre compte
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
              htmlFor="Code"
              className="block text-sm font-medium leading-6  text-gray-900"
            >
              Code activation
            </label>
            <div className="mt-2">
              <input
                placeholder="Code d'activation"
                id="Code"
                name="Code"
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
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
              Activer votre compte
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
