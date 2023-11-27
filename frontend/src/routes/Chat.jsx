import { MdDeleteForever } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from '../firebaseConfig';
import { collection, query, getDoc, orderBy, onSnapshot, where, doc } from "@firebase/firestore"
import { Storage } from '@capacitor/storage';
import ReceivedChatMessage from "../components/ReceivedChatMessage";
import SentChatMessage from "../components/SentChatMessage";
// import { useRef } from "react";

const Chat = () => {

    const navigate = useNavigate();
    const { chatID } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const [user, setUser] = useState();
    const [userID, setUserID] = useState();
    const [chatName, setChatName] = useState();
    const [error, setError] = useState();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = (await Storage.get({ key: 'jwtToken' })).value;
                console.log(token);
                fetch('http://localhost:4000/user/getUser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // Other headers if needed
                    }
                })
                    .then(response => response.json())
                    .then((data) => {
                        setUser(data.username);
                        setUserID(data.userId);
                    })
            } catch (error) {
                console.error('Error fetching chat status:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const chatMessageCollection = collection(firestore, 'chatMessages');
        const chatRef = doc(firestore, 'chats', chatID);
        const orderedQuery = query(chatMessageCollection, where('chat', '==', chatRef), orderBy('sentOn', 'asc'));   //order the messages according to the timestamp the server have stored
        const unsubscribe = onSnapshot(orderedQuery, async (querySnapshot) => {
            let updatedMessages = [];
            for (const doc of querySnapshot.docs) {

                const userRef = doc.data().user;
                const userData = await getDoc(userRef)
                // console.log(doc.data().sentOn);
                const milliseconds = doc.data().sentOn.seconds * 1000 + doc.data().sentOn.nanoseconds / 1e6;
                // console.log(milliseconds);
                const sentTime = new Date(milliseconds);

                updatedMessages.push({   //push to the list
                    id: doc.id,
                    content: doc.data().message,
                    sentTime: sentTime,
                    user: userData.data().username
                });
            }

            // console.log(updatedMessages);
            setMessages(updatedMessages);
            console.log(messages);
        });

        //   Cleanup function to unsubscribe when component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const saveContent = (e) => {
        setContent(e.target.value);
    }

    // const chatContainerRef = useRef(null);

    // useEffect(() => {
    //     const chatContainer = chatContainerRef.current;
    //     if (chatContainer) {
    //         chatContainer.scrollTop = chatContainer.scrollHeight;
    //     }
    // }, [messages]);



    useEffect(() => {
        // Fetch chat status based on the chat ID
        const fetchChatStatus = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat/getStatus?chatID=${chatID}`);
                const data = await response.json();
                setStatus(data.status); // Assuming your API response has a 'status' property
                setChatName(data.name)
            } catch (error) {
                console.error('Error fetching chat status:', error);
            }
        };

        if (chatID) {
            fetchChatStatus();
        }
    }, [chatID]);

    const handleClick = () => {
        if (messages === "") {
            return;
        }

        // Using the Fetch API to make a POST request
        const postData = {
            userID: userID,
            chatID: chatID,
            message: content
        }
        fetch('http://localhost:4000/chat/saveMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.state !== "Successful") {
                    setError("Message is not sent. Try again");
                } else {
                    setContent("");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError("Message is not sent. Try again");
            });
    };

    return (
        <div className="flex flex-col">

            {/* Chat Header */}
            <div className="chat-header top-0 fixed w-full z-10">
                <div className='pt-4 pb-5 px-4 flex items-center bg-[#CDE5FF]'>
                    <button className='float-left px-3 cursor-pointer'>
                        <IoIosArrowBack className='text-3xl font-semibold pt-0.5 text-[#001D32]' onClick={() => navigate('/dashboard')} />
                    </button>
                    <h2 className="text-xl font-medium text-[#001D32]">{chatName}</h2>
                    {(
                        <button className='ml-auto'>
                            <MdDeleteForever className='text-2xl font-semibold text-[#001D32] pt-0.5' />
                        </button>
                    )}

                </div>
                <hr />
            </div>


            <div className="my-20">

                <div id="" className="chat-bg py-4 w-ful px-6 overflow-auto">

                    {/* Message send by others */}
                    {messages.map((message) =>

                        (message.user !== user) ? <ReceivedChatMessage
                            sender={message.user}
                            message={message.content}
                            sent_time={message.sentTime.toString().split(" ")[4]}
                        /> : <SentChatMessage
                            message={message.content}
                            sent_time={message.sentTime.toString().split(" ")[4]}
                        />

                    )}


                </div>

                {status ? (
                    <div id="message-input" className="flex fixed bottom-0 left-0 items-center px-3 py-5 gap-2 w-full bg-[#CDE5FF]">
                        <input onChange={saveContent} value={content} name="content" className="w-full border border-[#001D32] rounded-md px-3 py-1" placeholder="Type Your Message Here" />
                        <button onClick={handleClick} className="float-right bg-[#001D32] border text-white text-lg p-3 rounded-[50%] ml-auto">
                            <IoSend />
                        </button>
                    </div>
                ) : (
                    <div id="message-input" className="flex fixed text-center bottom-0 left-0 items-center px-3 py-5 gap-2 w-full bg-[#CDE5FF]">
                        <p className="">No longer available for send messages</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Chat;