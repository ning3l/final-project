import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Box,
  Button,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import NavBar from "../NavBar";
import { useConversations } from "../../contexts/ConversationsProvider";
import moment from "moment";

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
            <Typography style={{ color: "#66AD93" }}>
              <b>{moment(el.createdAt).format("MMM Do YY, h:mm a")}</b>
            </Typography>
            <Typography>{el.text}</Typography>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div
          style={{
            textAlign: "right",
            marginRight: "30px",
          }}
        >
          <Typography style={{ color: "pink" }}>
            <b> {moment(el.createdAt).format("MMM Do YY, h:mm a")}</b>
          </Typography>
          <Typography>{el.text}</Typography>
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
        <Grid container>
          <Grid
            item
            xs={12}
            sm={3}
            className={classes.container}
            style={{ borderRight: "1px solid grey" }}
          >
            {myMessages.length &&
              myMessages.map((convo, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleSelectConvo(convo)}
                  style={{
                    height: "80px",
                    borderBottom: "1px solid grey",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Cindy Baker"
                    src="/static/images/avatar/3.jpg"
                    style={{ margin: "20px" }}
                  />
                  <Typography>{convo.contact}</Typography>
                </div>
              ))}
          </Grid>
          <Grid item xs={12} sm={9} className={classes.container}>
            <Box
              style={{
                backgroundColor: "lightgrey",
                height: "10%",
                borderBottom: "1px solid grey",
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedConvo && (
                <>
                  <Avatar
                    alt="Cindy Baker"
                    src="/static/images/avatar/3.jpg"
                    style={{ margin: "20px" }}
                  />
                  <Typography>{selectedConvo.contact}</Typography>
                </>
              )}
            </Box>
            <Box
              style={{
                height: "75%",
                overflow: "scroll",
              }}
            >
              {!selectedConvo
                ? "select a convo"
                : selectedConvo.messages.map((el, idx) => (
                    <div key={idx}>{createChatHistory(el)}</div>
                  ))}
            </Box>
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
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
