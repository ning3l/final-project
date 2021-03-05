import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import { login, logout, register, userContext } from "./utils/auth";
import Cookies from "js-cookie";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

const { default: PlantCatalog } = require("./components/Plants/PlantCatalog");
const { default: Events } = require("./components/Events/Events");
const { default: EventDetail } = require("./components/Events/EventDetail");
const { default: Users } = require("./components/User/Users");
const { default: PlantDetail } = require("./components/Plants/PlantDetail");
const { default: PlantRepo } = require("./components/Plants/PlantRepo");
const { default: UserProfile } = require("./components/User/UserProfile");
const { default: VisitedProfile } = require("./components/User/VisitedProfile");
const { default: Messenger } = require("./components/User/Messenger");
const { default: Login } = require("./components/Login");
const { default: Signup } = require("./components/Signup");
const { default: ProtectedRoute } = require("./components/ProtectedRoute");
const { default: NotFound } = require("./components/NotFound");

// EDITS FOR MUI DEFAULT STYLES
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

  // ###################### AUTH STATES ######################
  const [newUser, setNewUser] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  // ###################### USER STATES ######################
  const [myRepo, setMyRepo] = useState([]);
  const [myWishlist, setMyWishlist] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [needsCare, setNeedsCare] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  // ###################### GENERAL STATES ######################
  const [allPlants, setAllPlants] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // ###################### HANDLE REGISTER ######################
  const handleSetNewUser = (e) => {
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (!newUser || !newUser.username || !newUser.password || !newUser.city) {
      alert("pls fill out form");
      return;
    }
    if (newUser.password.length < 5) return alert("pls choose a password > 5");
    // console.log("/SIGNUP: submitting user", newUser);
    let user = await register(newUser);
    setAllUsers((prev) => [...prev, user]);
    setNewUser(null);
    history.push("/login");
  };

  // ###################### LOGIN + LOGOUT ######################
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
      history.push("/");
    }
  };

  const handleLogout = () => {
    setCurrUser(null);
    setCredentials(null);
    setMyRepo([]);
    setMyWishlist([]);
    setMyEvents([]);
    setNeedsCare([]);
    logout();
  };

  const getData = async () => {
    try {
      const { data: userData } = await userContext();
      if (!userData) {
        console.log("/PROFILE sth went wrong, no data");
      } else {
        // console.log("curr user from /me", userData);
        setCurrUser(userData);
        setMyWishlist(userData.wishlist);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (cookie) {
      getData();
    }
  }, [cookie]);

  // ###################### CURR USER REPO + WISHLIST ######################
  useEffect(() => {
    if (!currUser) return;
    axios
      .get("http://localhost:3000/api/plants/repository/me")
      .then((res) => {
        setMyRepo(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [currUser]);

  // ###################### CURR USER EVENTS ######################
  useEffect(() => {
    if (!currUser) return;
    axios
      .get("http://localhost:3000/api/events/me")
      .then((res) => {
        setMyEvents(res.data.events);
      })
      .catch((err) => console.log(err.message));
  }, [currUser]);

  // ###################### CARE CHECKER ######################
  // checks if any plant in the user repo needs attention today
  useEffect(() => {
    const today = new Date(Date.now()).toLocaleDateString("en-US");
    const careChecker = () => {
      for (let el of myRepo) {
        if (
          new Date(el.water.date).toLocaleDateString("en-US") === today ||
          new Date(el.fertilize.date).toLocaleDateString("en-US") === today ||
          new Date(el.repot.date).toLocaleDateString("en-US") === today
        ) {
          if (!needsCare.includes(el.plant.latin)) {
            setNeedsCare((prev) => [...prev, el.plant.latin]);
          }
        }
      }
    };
    careChecker();
  }, [myRepo, needsCare]);

  // ###################### ALL CATALOG PLANTS ######################
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plants")
      .then((res) => setAllPlants(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ###################### ALL EVENTS ######################
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events")
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // ###################### ALL USERS ######################
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // ###################### ALL MESSAGES ######################
  useEffect(() => {
    if (!currUser) return;

    // cluster messages so that each new contact gets indiv contact is present once
    function turnMessagesIntoConversations(arr) {
      const messageHistory = arr.reduce((acc, val) => {
        if (val.recipient !== currUser._id) {
          if (!acc[val.recipient]) acc[val.recipient] = [];
          acc[val.recipient].push(val);
        } else if (val.sender !== currUser._id) {
          if (!acc[val.sender]) acc[val.sender] = [];
          acc[val.sender].push(val);
        }
        return acc;
      }, []);

      // build new contact obj for each contact
      const contacts = [];
      for (let key in messageHistory) {
        contacts.push({
          contact: key,
          messages: [...messageHistory[key]],
        });
      }

      return contacts;
    }

    axios
      .get("http://localhost:3000/api/messages")
      .then((res) => {
        let history = turnMessagesIntoConversations(res.data);
        setMyMessages(history);
      })
      .catch((err) => console.log(err));
  }, [currUser]);

  // ###################### ROUTING ######################
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={UserProfile}
          myRepo={myRepo}
          setMyRepo={setMyRepo}
          myWishlist={myWishlist}
          setMyWishlist={setMyWishlist}
          credentials={credentials}
          setCredentials={setCredentials}
          currUser={currUser}
          setCurrUser={setCurrUser}
          handleLogout={handleLogout}
          setAllEvents={setAllEvents}
          setAllUsers={setAllUsers}
          myEvents={myEvents}
          setMyEvents={setMyEvents}
          needsCare={needsCare}
        />

        <Route
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
        <ProtectedRoute
          path="/event/:eventId"
          component={EventDetail}
          currUser={currUser}
          allEvents={allEvents}
          setAllEvents={setAllEvents}
          myEvents={myEvents}
          setMyEvents={setMyEvents}
          handleLogout={handleLogout}
        />
        {currUser && (
          <SocketProvider currUser={currUser}>
            <ConversationsProvider
              currUser={currUser}
              myMessages={myMessages}
              setMyMessages={setMyMessages}
            >
              <Switch>
                <ProtectedRoute
                  path="/user/:userId"
                  component={VisitedProfile}
                  allUsers={allUsers}
                  setCurrUser={setCurrUser}
                  setCredentials={setCredentials}
                  handleLogout={handleLogout}
                />
                <ProtectedRoute
                  path="/catalog"
                  component={PlantCatalog}
                  allPlants={allPlants}
                  setAllPlants={setAllPlants}
                  handleLogout={handleLogout}
                />
                <ProtectedRoute
                  path="/events"
                  component={Events}
                  currUser={currUser}
                  allEvents={allEvents}
                  setAllEvents={setAllEvents}
                  myEvents={myEvents}
                  setMyEvents={setMyEvents}
                  handleLogout={handleLogout}
                />
                <ProtectedRoute
                  path="/users"
                  component={Users}
                  allEvents={allEvents}
                  setAllEvents={setAllEvents}
                  myEvents={myEvents}
                  setMyEvents={setMyEvents}
                  currUser={currUser}
                  allUsers={allUsers}
                  handleLogout={handleLogout}
                />
                <ProtectedRoute
                  path="/messenger/:userId?"
                  component={Messenger}
                  allUsers={allUsers}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                  setCredentials={setCredentials}
                  handleLogout={handleLogout}
                  myMessages={myMessages}
                  setMyMessages={setMyMessages}
                />
                <ProtectedRoute
                  path="/repo"
                  component={PlantRepo}
                  myRepo={myRepo}
                  setMyRepo={setMyRepo}
                  setCredentials={setCredentials}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                  handleLogout={handleLogout}
                  setNeedsCare={setNeedsCare}
                  setAllUsers={setAllUsers}
                />
                <ProtectedRoute
                  path="/plant/:plantId"
                  component={PlantDetail}
                  setMyRepo={setMyRepo}
                  currUser={currUser}
                  setAllUsers={setAllUsers}
                  myWishlist={myWishlist}
                  setMyWishlist={setMyWishlist}
                  handleLogout={handleLogout}
                  allPlants={allPlants}
                />
                <Route component={NotFound} />
              </Switch>
            </ConversationsProvider>
          </SocketProvider>
        )}
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
