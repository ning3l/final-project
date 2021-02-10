import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({
  currUser,
  myMessages,
  setMyMessages,
  children,
}) {
  // myMessages holds chat history sorted by recipieny
  const [selectedConversationID, setSelectedConversationID] = useState("");
  const socket = useSocket();

  const addMessageToConversation = ({ recipient, text, sender }) => {
    // find conversation in all conversations
    let oldConvo = myMessages.find(
      (el) => el.contact === recipient || el.contact === sender
    );
    // either add new msg to old convo
    if (oldConvo) {
      // CHANGE THIS so msg obj is created server-side and you get createdAt prop
      oldConvo.messages.push({
        recipient,
        text,
        sender,
      });
    } else {
      // or create new convo for msg and push to messages arr
      let newConvo = {
        contact: sender,
        messages: [
          {
            recipient,
            sender,
            text,
          },
        ],
      };
      setMyMessages((prev) => [...prev, newConvo]);
    }
  };

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    // remove old eventListeners so new ones aren't constantly added on top
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recipient, text) {
    // send a recipient id and the msg text to server
    console.log("recipient for lena", recipient);
    socket.emit("send-message", { recipient, text });
    addMessageToConversation({ recipient, text, sender: currUser._id });
  }

  const value = {
    myMessages,
    setMyMessages,
    //selectedConversation: myMessages[selectedConversationIndex],
    selectedConversation: myMessages.find(
      (el) => el.contact === selectedConversationID
    ),
    setSelectedConversationID,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
