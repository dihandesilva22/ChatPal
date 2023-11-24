import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ChatList = ({ activeStatus }) => {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [topic, setTopic] = useState();
  const [activeChats, setActiveChats] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [requiredChats, setRequiredChats] = useState([]);

  // Load all the chats
  useEffect(() => {
    fetch("http://localhost:4000/chat/chat-list")
      .then((response) => response.json())
      .then((result) => setChats(result))
      .catch((error) =>
        console.error("Error fetching chat list:", error)
      );
  }, []);

  useEffect(() => {
    const active = chats.filter((chat) => chat.status === true);
    setActiveChats(active);

    const inactive = chats.filter((chat) => chat.status === false);
    setPreviousChats(inactive);

  }, [chats]);

  useEffect(() => {
    if (activeStatus === true) {
      setTopic("Active Chats");
      setRequiredChats(activeChats);
    } else {
      setTopic("Previous Chats");
      setRequiredChats(previousChats);
    }
  }, [activeStatus, activeChats, previousChats]);


  const handleViewClick = (id) => {
    navigate(`/chat/${id}`);
  }

  const handleCreateClick = () => {
    navigate('/new-chat')
  }

  return (
    <>
      <h2 className="text-lg font-semibold py-1.5 px-3 text-[#001D32] bg-[#CDE5FF] rounded-t-md">
        {topic}
      </h2>
      <hr className="text-[#001D32]" />

      {
        (requiredChats.length === 0 && activeStatus === false) ? (
          <p className="py-3">No previous chats</p>
        ) : (
        requiredChats.length === 0 && activeStatus === true) ? (
          <div className="flex py-4">
            <p className="">No active chats</p>
            <button className="bg-[#001D32] py-0.5 px-3 text-white rounded-md ml-auto text-sm" onClick={handleCreateClick}>
              Create
              </button>
          </div>
        ) : (
          requiredChats.map((chat, id) => (
            <div className="flex items-center pt-5" key={id}>
              <p className="font-medium pl-3">{chat.chatName}</p>
              <button
                className="float-right bg-[#001D32] text-white text-sm px-3 py-0.5 rounded-md ml-auto"
                onClick={() => handleViewClick(chat.chatID)}
              >
                View
              </button>
            </div>
          ))
        )}
    </>
  );
};

export default ChatList;
