import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';
import { BiSolidError } from "react-icons/bi";

const ChatCreationPage = () => {

    const [chatName, setChatName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setChatName(e.target.value)
    }

    const handleCreateClick = () => {

        if (chatName === '') {
            setError('Please enter a name for the chat');
            return;
        }else{
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
                    
                    if (data.state === "successful") {
                        Swal.fire({
                            title: "New Chat Creation",
                            text: "Chat Created Successfully!",
                            icon: "success"
                        }).then(() => {
                            navigate('/chat');
                        });
                    } else {
                        setError("Try again with a different name");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError("Chat creation is not successful. Try again");
                });
        }

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
                        onChange={handleChange}
                        placeholder='Chat Name' /> 
                </div>

                <div className={`px-3 py-0.5 flex gap-1 bg-red-100 ${error === '' ? 'hidden' : ''} text-red-700 rounded`}>
                    <BiSolidError className='font-bold text-lg pt-0.5'/>
                    <p className='text-sm'>{error}</p>
                </div>

                <div className='justify-center flex pt-8 pb-3'>
                    <button className='px-4 py-1.5 bg-[#001D32] text-white rounded-lg text-sm' onClick={handleCreateClick}>
                        CREATE
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatCreationPage;