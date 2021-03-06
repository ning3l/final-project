import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const APP_NAME = "final-project";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_LOCAL;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_HEROKU;
}

const setAuthHeaders = () => {
  const token = Cookies.get(`${APP_NAME}-auth-token`);
  if (token) {
    // console.log("/AUTH headers are getting set");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

const decodeToken = () => {
  const token = Cookies.get(`${APP_NAME}-auth-token`);
  let decodedToken;
  try {
    if (token) decodedToken = jwt.decode(token);
  } catch (err) {
    console.log(err.message);
  }
  return decodedToken;
};

const register = (newUser) => {
  const { username, password, plantsitting, city } = newUser;
  return axios
    .post("/api/users/register", {
      username,
      password,
      plantsitting,
      city,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err.message));
};

const login = async (credentials) => {
  const { username, password } = credentials;
  try {
    // change address after deployment: check auth frontend repo ex.
    const data = await axios.post("/api/auth/login", {
      username,
      password,
    });
    const token = data.headers["x-authorization-token"];

    if (token) {
      // console.log("/AUTH/login", token);
      Cookies.set(`${APP_NAME}-auth-token`, token);
      setAuthHeaders();
    }
  } catch (err) {
    console.log(err.message);
    return "please enter valid credentials";
  }
};

const logout = () => {
  // console.log("/AUTH/logout: logging out...");
  Cookies.remove(`${APP_NAME}-auth-token`);
};

const userContext = async () => {
  setAuthHeaders();
  try {
    const data = await axios.get("/api/auth/me");
    return data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export {
  axios as client,
  setAuthHeaders,
  login,
  logout,
  userContext,
  decodeToken,
  register,
};
