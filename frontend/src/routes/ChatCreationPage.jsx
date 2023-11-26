import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';

const ChatCreationPage = () => {

    const [chatName, setChatName] = useState('');

    const navigate = useNavigate();

    const handleCreateClick = () => {

        const postData = {
            name: chatName,
            userID: "ypAfGjaIrXjSRN5E1WRK"
        }
        
        fetch('http://localhost:4000/chat/create-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(async data => {
                
                if (data.state === "Successful") {
                    //console.log(data.state);
                    Swal.fire({
                        title: "New Chat Creation",
                        text: "Chat Created Successfully!",
                        icon: "success"
                    }).then(() => {
                        navigate('/chat');
                    });
                } else {
                    Swal.fire({
                        title: "New Chat Creation",
                        text: "Chat Creation Unsuccessful!",
                        icon: "error"
                    }).then(() => {
                        navigate('/dashboard');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <>
            <div className='bg-[#006399] py-4 sticky top-0 left-0 right-0 z-20'>
                <button className='float-left px-3'>
                    <IoIosArrowBack className='text-3xl font-semibold pt-1 text-white' onClick={() => navigate(-1)} />
                </button>
                <h1 className='text-2xl font-semibold pl-5 text-white'>ChatPal</h1>
            </div>
            <div className='flex flex-col justify-center items-center m-0 h-full px-4 py-2'>
                <h2 className='text-xl font-semibold py-3 justify-center flex text-[#001D32]'>
                    Create a New Chat
                </h2>
                <div className='py-5 w-3/5'>
                    <input className='w-full px-3 py-0.5 border border-[#001D32] rounded-md' value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        placeholder='Chat Name' /> 
                </div>
                <div className='justify-center flex py-3'>
                    <button className='px-4 py-1.5 bg-[#001D32] text-white rounded-lg text-sm' onClick={handleCreateClick}>
                        CREATE
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatCreationPage;