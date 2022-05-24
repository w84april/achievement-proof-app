import axios from "axios";

export const getProducts = async (token) => {
  axios.defaults.baseURL = process.env.REACT_APP_API;

  const res = await axios({
    method: "get",
    url: "/product",
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
