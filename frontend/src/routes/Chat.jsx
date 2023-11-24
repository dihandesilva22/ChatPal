import { CgMoreVerticalAlt } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { firestore } from '../firebaseConfig';
import { collection, query, getDoc, orderBy, onSnapshot } from "@firebase/firestore"
import ReceivedChatMessage from "../components/ReceivedChatMessage";
import SentChatMessage from "../components/SentChatMessage";

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState();

    useEffect(() => {
        const chatMessageCollection = collection(firestore, 'chatMessages');

        const orderedQuery = query(chatMessageCollection, orderBy('sentOn', 'asc'));   //order the messages according to the timestamp they have stored
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
    const handleClick = () => {
        if (messages === "") {
            return;
        }

        // Using the Fetch API to make a POST request
        const postData = {
            userID: "9npAJbikW2e4kdjbsMTo",
            chatID: "hscUcabi8UpRSC132egZ",
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
            <div className="chat-header top-16 static z-10">
                <div className='pt-4 pb-5 px-4 flex items-center bg-[#CDE5FF]'>
                    <button className='float-left px-3'>
                        <IoIosArrowBack className='text-3xl font-semibold pt-0.5 text-[#001D32]' />
                    </button>
                    <h2 className="text-xl font-medium text-[#001D32]">Chat Name</h2>
                    <button className='ml-auto'>
                        <CgMoreVerticalAlt className='text-2xl font-semibold text-[#001D32] pt-0.5' />
                    </button>
                </div>
                <hr />
            </div>


            <div className="flex-1 overflow-hidden">
                {/* <div className="chat-bg py-4 w-ful px-6 overflow-auto"> */}
                <div className="chat-bg py-4 w-ful px-6 overflow-auto">
                    {messages.map((message) => (
                        <div className="chat-bubble max-w-[40%] bg-slate-200 rounded-tl-none rounded-xl px-4 py-2 mb-4" key={message.id}>
                            <h4 className="font-medium text-[#006399]">{message.user}</h4>
                            <p className="whitespace-normal text-justify">{message.content}</p>
                            <h4 className="font-regular text-sm text-gray-500 text-right">{message.sentTime.toString().split(" ")[4]}</h4>

                        </div>
                    ))}
                </div>

                {/* Message send by others */}
                <ReceivedChatMessage
                    sender={"John Doe"}
                    message={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto tempore eligendi recusandae nihil beatae!"}
                    sent_time={"12.40"}
                />


                {/* Message send by user(me) */}
                <SentChatMessage
                    message={"Ex distinctio accusamus magnam ratione? Delectus alias dolores eos ullam aut molestias facilis sint voluptatem aspernatur."}
                    sent_time={"14.58"}
                />
                {/* Write message */}
                <div className="flex items-center sticky px-3 bottom-0 left-0 py-5 gap-2 w-full bg-[#CDE5FF]">
                    <input onChange={saveContent} value={content} name="content" className="w-full border border-[#001D32] rounded-md px-3 py-1" placeholder="Type Your Message Here" />
                    <button onClick={handleClick} className="float-right bg-[#001D32] border text-white text-lg p-3 rounded-[50%] ml-auto">
                        <IoSend />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Chat;