import axios from "axios";

export const getItems = async (token, approved, search, sort) => {
  axios.defaults.baseURL = process.env.REACT_APP_API;

  const res = await axios({
    method: "get",
    url: "/achievement",
    headers: {
      Authorization: token,
    },
    params: {
      approved,
      search,
      sort,
    },
  });
  return res.data;
};
