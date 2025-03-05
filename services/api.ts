import axios from "axios";

export const getAuthUserData = async (token: string) => {
  return await axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: "Bearer" + token },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
