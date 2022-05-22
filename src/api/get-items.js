import axios from "axios";

export const getItems = async (token, approved, search, sort, role) => {
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
      sort,
      role,
    },
  });
  return res.data;
};
