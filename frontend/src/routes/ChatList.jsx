import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ChatList = ({ activeStatus }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // New loading state
  const [chats, setChats] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [requiredChats, setRequiredChats] = useState([]);

  // Load all the chats
  useEffect(() => {
    fetch("http://localhost:4000/chat/chat-list")
      .then((response) => response.json())
      .then((result) => {
        setChats(result);
        setLoading(false); // Set loading to false when chats are loaded
      })
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
      setRequiredChats(activeChats);
    } else {
      setRequiredChats(previousChats);
    }
  }, [activeStatus, activeChats, previousChats]);

  const handleViewClick = (id) => {
    navigate(`/chat`);
  };

  const handleCreateClick = () => {
    navigate('/new-chat');
  };

  return (
    <>

      {loading ? (
        <p className="py-4 px-3">Loading...</p>
      ) : (
        <>
          {requiredChats.length === 0 && activeStatus === false ? (
            <p className="py-4 pl-3">No previous chats</p>
          ) : requiredChats.length === 0 && activeStatus === true ? (
            <div className="flex py-4">
              <p className="pl-3">No active chats</p>
              <button
                className="bg-[#001D32] py-1 px-4 text-white rounded-lg ml-auto text-sm"
                onClick={handleCreateClick}
              >
                Create
              </button>
            </div>
          ) : (
            requiredChats.map((chat, id) => (
              <div className="flex items-center pt-4" key={id}>
                <p className="font-medium pl-3">{chat.chatName}</p>
                <button
                  className="float-right bg-[#001D32] text-white text-sm px-4 py-1 rounded-lg ml-auto"
                  onClick={() => handleViewClick(chat.chatID)}
                >
                  View
                </button>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default ChatList;
