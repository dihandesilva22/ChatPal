import '../css/dashboard.css';
import ChatList from "./ChatList";
import { useState, useEffect } from "react";
import { Storage } from '@capacitor/storage';

const Dashboard = () => {

    const [active, setActive] = useState(true);
    const [user, setUser] = useState();
    const [userID, setUserID] = useState();

    const ip = '10.83.68.25';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = (await Storage.get({ key: 'jwtToken' })).value;
                console.log(token);
                fetch(`http://${ip}:4000/user/getUser`, {
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

    const handleActiveChats = () => {
        document.getElementById('active-chats').classList.add('active');
        document.getElementById('previous-chats').classList.remove('active');
        setActive(true);
    }
    const handlePreviousChats = () => {
        document.getElementById('previous-chats').classList.add('active');
        document.getElementById('active-chats').classList.remove('active');
        setActive(false);
    }

    return (
        <>
            <div className='bg-[#006399] py-4 sticky top-0 left-0 right-0 z-20'>
                <h1 className='text-2xl font-semibold pl-5 text-white'>ChatPal</h1>
            </div>
            <div className="w-full px-4 py-2">
                <h2 className="text-2xl font-semibold py-7 text-[#001D32]">
                    Hello {user}!
                </h2>

                <h2 className="text-lg font-semibold py-1.5 px-3 text-[#001D32] bg-[#CDE5FF] rounded-t-md">
                    { active ? "Active Chats" : "Previous Chats" }
                </h2>
                <hr className="text-[#001D32]" />

                <div id="chat-list" className='overflow-auto'>
                    <ChatList activeStatus={active} />
                </div>

                <div className="fixed left-0 bottom-0 w-full">

                    <ul className="flex w-full text-md font-medium text-center">
                        <li id="active-chats" className="me-0 py-3 w-1/2 border border-neutral-300 border-b-0 active rounded-t-lg bg-gray-100 hover:text-gray-300 hover:bg-gray-800 cursor-pointer"
                            onClick={handleActiveChats}>
                            Active Chats
                        </li>
                        <li id="previous-chats" className="me-0 py-3 w-1/2 rounded-t-lg border border-b-0 border-neutral-300 bg-gray-100 hover:text-gray-300 hover:bg-gray-800 cursor-pointer"
                            onClick={handlePreviousChats}>
                            Previous Chats
                        </li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default Dashboard;