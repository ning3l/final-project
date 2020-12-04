import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import { login, logout, register, userContext } from "./utils/auth";
import Cookies from "js-cookie";

const { default: PlantCatalog } = require("./components/PlantCatalog");
const { default: PlantDetail } = require("./components/PlantDetail");
const { default: PlantRepo } = require("./components/PlantRepo");
const { default: UserProfile } = require("./components/UserProfile");
const { default: Login } = require("./components/Login");
const { default: Signup } = require("./components/Signup");
const { default: ProtectedRoute } = require("./components/ProtectedRoute");

// EDIT MUI DEFAULT STYLES
const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "2.3em",
      fontWeight: "700",
    },
    h2: {
      fontSize: "1.7em",
      fontWeight: "500",
    },
    body1: {
      fontWeight: "500",
    },
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      main: "#0000ff",
    },
    secondary: {
      main: "#eae906",
    },
  },
});

function App() {
  const history = useHistory();

  // ###################### HANDLE REGISTER ######################
  const [newUser, setNewUser] = useState(null);

  const handleSetNewUser = (e) => {
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (!newUser || !newUser.username || !newUser.password) {
      alert("pls fill out form");
      return;
    }
    console.log("/SIGNUP: submitting user", newUser);
    await register(newUser);
    setNewUser(null);
    history.push("/login");
  };

  // ###################### LOGIN + LOGOUT ######################
  const [credentials, setCredentials] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const cookie = Cookies.get("final-project-auth-token");

  const handleSetCredentials = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    if (!credentials || !credentials.username || !credentials.password) {
      alert("pls fill out form");
      return;
    }
    const err = await login(credentials);
    if (err) {
      alert(err);
    } else {
      getData();
      history.push("/"); // go to profile page
    }
  };

  const handleLogout = () => {
    console.log("call from handleLogout");
    // setAnchorEl(null);
    // hear you also need to clear the currUser:
    setCurrUser(null);
    setCredentials(null);
    setMyRepo([]);
    logout();
  };

  const getData = async () => {
    try {
      const { data: userData } = await userContext();
      if (!userData) {
        console.log("/PROFILE sth went wrong, no data");
      } else {
        // from /me, you could just extract username, bio & profile pic
        console.log("res from /me", userData);
        setCurrUser(userData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (cookie) {
      getData();
    }
  }, []);

  // ###################### CURR USER REPO ######################
  const [myRepo, setMyRepo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plants/repository/")
      .then((res) => {
        // ALTERNATIVE: get data from the user repo array!
        // console.log("content user repo", res.data.repository);
        const data = res.data.repository;
        setMyRepo(data);
      })
      .catch((err) => console.log(err.message));
  }, [currUser]);

  // ###################### ALL CATALOG PLANTS ######################

  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plants")
      .then((res) => setAllPlants(res.data))
      .catch((err) => console.log(err));
  }, []);

  // GET ALL USERS

  // GET All MESSAGES

  // GET ALL EVENTS

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* <Route
          exact
          path="/"
          render={(props) => (
            <UserProfile
              myRepo={myRepo}
              credentials={credentials}
              setCredentials={setCredentials}
              currUser={currUser}
              setCurrUser={setCurrUser}
              handleLogout={handleLogout}
              {...props}
            />
          )}
        /> */}
        <ProtectedRoute
          exact
          path="/"
          component={UserProfile}
          myRepo={myRepo}
          setMyRepo={setMyRepo}
          credentials={credentials}
          setCredentials={setCredentials}
          currUser={currUser}
          setCurrUser={setCurrUser}
          handleLogout={handleLogout}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              handleLogin={handleLogin}
              handleSetCredentials={handleSetCredentials}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/signup"
          render={(props) => (
            <Signup
              newUser={newUser}
              setNewUser={setNewUser}
              handleSetNewUser={handleSetNewUser}
              handleRegister={handleRegister}
              setCurrUser={setCurrUser}
              setCredentials={setCredentials}
              handleLogout={handleLogout}
              {...props}
            />
          )}
        />
        <Route
          path="/catalog"
          render={(props) => (
            <PlantCatalog
              allPlants={allPlants}
              setAllPlants={setAllPlants}
              handleLogout={handleLogout}
              {...props}
            />
          )}
        />
        {/* <Route
          path="/repo"
          render={(props) => (
            <PlantRepo
              myRepo={myRepo}
              setMyRepo={setMyRepo}
              credentials={credentials}
              setCredentials={setCredentials}
              currUser={currUser}
              setCurrUser={setCurrUser}
              handleLogout={handleLogout}
              {...props}
            />
          )}
        /> */}
        <ProtectedRoute
          path="/repo"
          component={PlantRepo}
          myRepo={myRepo}
          setCredentials={setCredentials}
          setCurrUser={setCurrUser}
          handleLogout={handleLogout}
        />
        <Route
          path="/:plantId"
          render={(props) => <PlantDetail setMyRepo={setMyRepo} {...props} />}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
