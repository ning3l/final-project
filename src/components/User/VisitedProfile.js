import React from "react";
import { useConversations } from "../../contexts/ConversationsProvider";

// search for this specific user in allUsers db

export default function VisitedProfile({ match, history, allUsers }) {
  console.log(match.params.userId);

  const {
    myMessages,
    setMyMessages,
    setSelectedConversationID,
  } = useConversations();

  const user = allUsers.find((user) => user._id === match.params.userId);
  console.log("THIS USER", user);

  const handleOpenMessenger = (user) => {
    let oldConvo = myMessages.find((el) => el.contact === user._id);
    if (!oldConvo) {
      let newConvo = {
        contact: user._id,
        messages: [],
      };
      setMyMessages((prev) => [...prev, newConvo]);
    }
    setSelectedConversationID(user._id);
    history.push({
      pathname: `/messenger/${user._id}`,
      state: { detail: user },
    });
  };
  return (
    <>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <span>Is user up for plantsitting?</span>
          <img
            src={`http://localhost:3000/images/user/${user.profileImg}`}
            alt="user profile pic"
          />
          <h2>plants user owns</h2>
          <h2>events user attends</h2>
          <button
            onClick={() => handleOpenMessenger(user)}
            // onClick={() =>
            //   history.push({
            //     pathname: `/messenger/${user._id}`,
            //     state: { detail: user },
            //   })
            // }
          >
            Send a message
          </button>
        </div>
      )}
    </>
  );
}
