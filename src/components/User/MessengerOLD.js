import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,  TextField,
  Box,
  Button,
  Container,
} from "@material-ui/core";
import NavBar from "../NavBar";
import axios from "axios";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "75%",
  },
  container: {
    height: "100vh",
    textAlign: "center",
  },
}));

// SETUP INITIAL ADMIN MSG IN CASE USER HAS NO MESSAGES YET
// useEffect(() => {
//   if (!messages.length) {
//     setMessages((prev) => [
//       ...prev,
//       {
//         text: "naaa",
//         sender: "5ff8406b98a099640853f31a",
//       },
//     ]);
//   }
// });

// CREATE CHAT HISTORY
// const createChatHistory = (id, el, index) => {
//   if (el.sender !== id) {
//     return (
//       <div key={index}>
//         <div>
//           <b style={{ color: "#66AD93" }}>sender!</b>
//           <p>{el.text}</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div key={index}>
//       <div>
//         <b style={{ color: "#FF8C00" }}>You</b>
//         <p>{el.text}</p>
//       </div>
//     </div>
//   );
// };

// const handleSendMessage = (e) => {
//   e.preventDefault();
//   console.log("THIS IS TO BE SENT", newMsg);
//   // let receiverId = match.params OR input via func
//   axios
//     .post("http://localhost:3000/api/messages/", newMsg)
//     .then((data) => {
//       socket.send(data.data);
//       getMessages();
//     })
//     .catch((err) => console.log(err));
// };

export default function Messenger({
  location,
  match,
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  myMessages,
  setMyMessages,
}) {
  // console.log(location.state.detail); // this gives you the user you want to send message to!
  //const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // load array with old messages from user
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/messages")
      .then((res) => {
        console.log("OLD MESSAGES", res.data);
        setMyMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // HANDLE SOCKET CONNECTION
  const socketRef = useRef();
  useEffect(() => {
    // connect to socket server
    socketRef.current = io.connect("http://localhost:3000");

    // handle new messages
    socketRef.current.on("message", (message) => {
      console.log("here");
      // server sends back the message
      receivedMessage(message);
    });
  }, []);

  // LET CURR USER SEND A NEW MESSAGE
  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  // receiver id = 5ff8414e3c18806429ba0cb9
  // if (receiver.id === id), only then emit message? but what about receiver side?
  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socketRef.current.emit("send message", newMessage);
  //   setNewMessage("");
  // };
  const sendMessage = (e) => {
    e.preventDefault();
    // send this message to database
    let messageObj = {
      text: newMessage,
    };
    socketRef.current.emit("send message", messageObj);
    axios
      .post(
        `http://localhost:3000/api/messages/${match.params.userId}`,
        messageObj
      )
      .then((res) => {
        console.log(res.data);
        // setMessages((prev) => [...prev, res.data]);
        // also push this on the user's allMessages arr
        // or maybe you don't need this actually
      })
      .catch((err) => console.log(err));

    // clear out currMsg
    setNewMessage("");
  };

  // LOAD ALL MESSAGES
  // this function pushes message to all messages array
  function receivedMessage(msg) {
    setMessages((prev) => [...prev, msg]);
    //setMyMessages((prev) => [...prev, msg]);
    console.log("all messages", messages);
  }

  const classes = useStyles();
  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <div className={classes.root}>
        <Grid container style={{ backgroundColor: "salmon" }}>
          <Grid
            item
            xs={12}
            sm={3}
            style={{ backgroundColor: "pink" }}
            className={classes.container}
          >
            list of users
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            style={{ backgroundColor: "violet" }}
            className={classes.container}
          >
            <Box style={{ backgroundColor: "green", height: "10%" }}>
              {/* {otherUser && otherUser.username} */}
            </Box>
            <Box
              style={{
                backgroundColor: "lightblue",
                height: "70%",
                overflow: "scroll",
              }}
            >
              {currUser ? (
                [...myMessages, ...messages].map((el, index) => (
                  <div key={index}>{el.text}</div>
                ))
              ) : (
                <div>Loading</div>
              )}
            </Box>
            {/* <Box style={{ backgroundColor: "white", height: "20%" }}>
              <TextField
                placeholder="Type a message..."
                multiline
                rows={2}
                rowsMax={4}
              />
            </Box> */}
            <form onSubmit={sendMessage}>
              <Container>
                <Grid item>
                  <TextField
                    className={classes.formInputs}
                    name="text"
                    label="your message"
                    variant="outlined"
                    type="text"
                    margin="dense"
                    onChange={handleChange}
                    required={true}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    type="submit"
                    margin="dense"
                    className={classes.formInputs}
                  >
                    Submit
                  </Button>
                </Grid>
              </Container>
              {/* <TextField
                id="standard-name"
                label="Name"
                value="hello"
                variant="outlined"
                margin="dense"
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <Button variant="outlined" margin="dense">
                      hi
                    </Button>
                  ),
                }}
              /> */}
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
