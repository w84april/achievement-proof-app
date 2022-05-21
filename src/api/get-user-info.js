import axios from "axios";

export const getUserInfo = async (userId, token) => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  console.log(userId);

  const res = await axios({
    method: "get",
    url: "/user",
    headers: {
      Authorization: token,
    },
    params: {
      id: userId,
    },
  });

  return res.data;
};
