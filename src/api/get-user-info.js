import axios from "axios";

export const getUserInfo = async (token) => {
  axios.defaults.baseURL = process.env.REACT_APP_API;

  const res = await axios({
    method: "get",
    url: "/user",
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
