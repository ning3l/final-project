import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Box, Button, Container } from "@material-ui/core";
import NavBar from "../NavBar";
import { useConversations } from "../../contexts/ConversationsProvider";

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

export default function Messenger({
  location,
  match,
  history,
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
}) {
  const classes = useStyles();
  const [text, setText] = useState(""); // create a new message
  const {
    sendMessage,
    selectedConversation,
    myMessages,
    selectedConvo,
    setSelectedConvo,
    setSelectedConversationID,
  } = useConversations();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(selectedConvo.contact, text);
    setText("");
  };

  // select a convo from list of contacts to see message history / select recipient
  const handleSelectConvo = (convo) => {
    let select = myMessages.find((el) => el.contact === convo.contact);
    setSelectedConvo(select);
    history.push(`/messenger/${convo.contact}`);
  };

  // create different colors for each user
  const createChatHistory = (el) => {
    if (el.sender !== currUser._id) {
      return (
        <div>
          <div style={{ textAlign: "left", marginLeft: "30px" }}>
            <p style={{ color: "#66AD93" }}>
              <b>
                {el.recipient} at
                {el.createdAt}
              </b>
            </p>
            <p>{el.text}</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div style={{ textAlign: "right", marginRight: "30px" }}>
          <p style={{ color: "pink" }}>
            <b>You at {el.createdAt}</b>
          </p>
          <p>{el.text}</p>
        </div>
      </div>
    );
  };

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
            {myMessages.length &&
              myMessages.map((convo, idx) => (
                <div key={idx} onClick={(e) => handleSelectConvo(convo)}>
                  {convo.contact}
                </div>
              ))}
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
              {/* {currUser ? (
                [...myMessages, ...messages].map((el, index) => (
                  <div key={index}>{el.text}</div>
                ))
              ) : (
                <div>Loading</div>
              )} */}
              {!selectedConvo
                ? "select a convo"
                : selectedConvo.messages.map((el, idx) => (
                    <div key={idx}>{createChatHistory(el)}</div>
                  ))}
            </Box>
            {/* <Box style={{ backgroundColor: "white", height: "20%" }}>
                  <TextField
                    placeholder="Type a message..."
                    multiline
                    rows={2}
                    rowsMax={4}
                  />
                </Box> */}
            <form onSubmit={handleSubmit}>
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
