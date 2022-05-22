import axios from "axios";

export const getItems = async (token, approved, search, result, sort, role) => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  console.log(typeof role);
  const res = await axios({
    method: "get",
    url: "/achievement",
    headers: {
      Authorization: token,
    },
    params: {
      approved,
      search,
      result,
      sort,
      role,
    },
  });
  return res.data;
};
