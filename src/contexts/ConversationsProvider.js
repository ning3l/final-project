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
  // myMessages holds chat history sorted by recipient
  const [selectedConversationID, setSelectedConversationID] = useState("");
  const socket = useSocket();

  // TEST
  const [selectedConvo, setSelectedConvo] = useState(null);

  const addMessageToConversation = ({ recipient, text, sender }) => {
    // find conversation in all conversations
    let oldConvo = myMessages.find(
      (el) => el.contact === recipient || el.contact === sender
    );
    console.log("an old convo was found:", oldConvo);
    // either add new msg to old convo
    if (oldConvo) {
      // CHANGE THIS so msg obj is created server-side and you get createdAt prop
      setMyMessages((prev) => [
        ...prev,
        prev
          .find((el) => el.contact === oldConvo.contact)
          .messages.push({ recipient, text, sender }),
      ]);
      console.log("all my messages after update", myMessages);
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
    socket.emit("send-message", { recipient, text });
    addMessageToConversation({ recipient, text, sender: currUser._id });
  }

  const value = {
    myMessages,
    setMyMessages,
    selectedConvo,
    setSelectedConvo,
    setSelectedConversationID,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
