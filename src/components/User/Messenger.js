import React, { useState, useEffect, useRef } from "react";
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
import noData from "../../assets/noData.png";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function Messenger({
  history,
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  allUsers,
}) {
  const classes = useStyles();
  const [text, setText] = useState(""); // create a new message
  const {
    sendMessage,
    myMessages,
    selectedConvo,
    setSelectedConvo,
  } = useConversations();

  const lastMsgRef = useRef();

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ smooth: true });
    }
  });

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
          <div
            style={{
              textAlign: "left",
              marginLeft: "30px",
              marginRight: "30%",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                display: "inline-block",
                padding: "15px 20px",
                margin: "5px",
                borderRadius: "5px",
              }}
            >
              <Typography color="primary">
                <b>{moment(el.createdAt).format("MMM Do YY, h:mm a")}</b>
              </Typography>
              <Typography>{el.text}</Typography>
            </div>
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
            marginLeft: "30%",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              display: "inline-block",
              padding: "15px 20px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            <Typography style={{ color: "pink" }}>
              <b> {moment(el.createdAt).format("MMM Do YY, h:mm a")}</b>
            </Typography>
            <Typography>{el.text}</Typography>
          </div>
        </div>
      </div>
    );
  };

  // create user info for selected convo
  const createUserInfo = (id, item) => {
    let selectedUser = allUsers.find((user) => user._id === id);
    if (item === "text") return selectedUser.username;
    if (item === "pic") return selectedUser.profileImg;
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
            sm={4}
            md={3}
            style={{
              borderRight: "1px solid lightgrey",
              overflow: "scroll",
            }}
          >
            {myMessages.length &&
              myMessages.map((convo, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleSelectConvo(convo)}
                  style={{
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid lightgrey",
                    backgroundColor:
                      selectedConvo && convo.contact === selectedConvo.contact
                        ? "lightgrey"
                        : "",
                  }}
                >
                  <Avatar
                    alt="profile pic"
                    src={`/images/user/${createUserInfo(convo.contact, "pic")}`}
                    style={{ margin: "20px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginRight: "5%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        {createUserInfo(convo.contact, "text")}
                      </Typography>
                      <Typography>
                        {convo.messages.length
                          ? moment(
                              convo.messages[convo.messages.length - 1]
                                .createdAt
                            ).format("MMM Do YY")
                          : ""}
                      </Typography>
                    </div>
                    <div
                      style={{
                        height: "25px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography style={{ color: "grey" }}>
                        {convo.messages.length
                          ? convo.messages[convo.messages.length - 1].text
                          : ""}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
          </Grid>
          <Grid item xs={12} sm={8} md={9} className={classes.container}>
            <Box
              style={{
                backgroundColor: "pink",
                height: "80px",
                borderBottom: "1px solid lightgrey",
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedConvo && (
                <>
                  <Avatar
                    alt="profile pic"
                    src={`/images/user/${createUserInfo(
                      selectedConvo.contact,
                      "pic"
                    )}`}
                    style={{ margin: "20px" }}
                  />
                  <Typography>
                    {createUserInfo(selectedConvo.contact, "text")}
                  </Typography>
                </>
              )}
            </Box>
            {!selectedConvo ? (
              <Box
                style={{
                  height: "75%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={noData} style={{ width: "100px" }} alt="plant pot" />
                <Typography
                  style={{ backgroundColor: "yellow", display: "inline" }}
                >
                  Pls select a conversation
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  style={{
                    height: "72%",
                    overflow: "scroll",
                  }}
                >
                  {selectedConvo.messages.map((el, idx) => {
                    const lastMsg = selectedConvo.messages.length - 1 === idx;
                    return (
                      <div ref={lastMsg ? lastMsgRef : null} key={idx}>
                        {createChatHistory(el)}
                      </div>
                    );
                  })}
                </Box>
                <form onSubmit={handleSubmit}>
                  <Container
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      name="text"
                      label="your message"
                      variant="outlined"
                      type="text"
                      margin="dense"
                      onChange={handleChange}
                      required={true}
                      value={text}
                      fullWidth={true}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      margin="dense"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Container>
                </form>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
