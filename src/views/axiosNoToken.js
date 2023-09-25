import axios from "axios";
import router from "../router";

const axiosClientSansTOken = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
});


axiosClientSansTOken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.navigate("/login");
      return error;
    }
    throw error;
  }
);
export default axiosClientSansTOken;
