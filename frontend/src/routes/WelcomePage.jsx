import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Storage } from '@capacitor/storage';
import Swal from 'sweetalert2';
import { BiSolidError } from "react-icons/bi";

const WelcomePage = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    // Pseudo code for checking stored token on app launch


    async function checkToken() {
        let jwtToken;
        try {
            const result = await Storage.get({ key: 'jwtToken' });
            jwtToken = result.value;

        } catch (error) {
            // Handle the error, if any
            console.error('Error fetching jwtToken:', error);
        }

        if (jwtToken !== null) {
            // console.log(jwtToken);
            // Token exists, navigate to the dashboard
            navigate('/dashboard');
        }
    };

    useEffect(() => {
        checkToken();
    })


    const handleChange = (e) => {
        setError('');
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
        } else if (e.target.name === "lastName") {
            setLastName(e.target.value);
        }
    }
    const handleStartClick = () => {

        if (firstName === '' || lastName === '') {
            setError('First Name and Last Name fields are mandatory');
            return;
        } else {
            const postData = {
                name: firstName + " " + lastName,
            }
            fetch('http://localhost:4000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then(response => response.json())
                .then(async data => {
                    if (data.state !== "successful") {
                        setError("Use different first name or last name or both");
                    } else {
                        console.log(data);
                        const receivedToken = data.token;
                        await Storage.set({ key: 'jwtToken', value: receivedToken });
                      
                        Swal.fire({
                            title: "User Account Creation",
                            text: "User Account Created Successfully!",
                            icon: "success"
                        }).then(() => {
                            navigate('/dashboard');
                        });

                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError("User registration is not successful. Try again");
                });

        }

    }

    return (
        <>
            <div className='bg-[#006399] py-4 sticky top-0 left-0 right-0 z-20'>
                <h1 className='text-2xl font-semibold pl-8 text-white'>ChatPal</h1>
            </div>
            <div className='flex flex-col justify-center items-center m-0 h-full px-4 py-2'>
                <h2 className='text-xl font-semibold py-3 justify-center flex text-[#001D32]'>
                    Welcome to ChatPal!
                </h2>
                <div className='py-5 w-3/5'>
                    <input className='w-full px-3 py-0.5 mb-3 border border-[#001D32] rounded-md' type="text" onChange={handleChange} value={firstName} name="firstName" placeholder='First Name' /> <br />
                    <input className='w-full px-3 py-0.5 border border-[#001D32] rounded-md' type="text" onChange={handleChange} value={lastName} name="lastName" placeholder='Last Name' />
                </div>

                <div className={`px-3 py-0.5 flex gap-1 bg-red-100 ${error === '' ? 'hidden' : ''} text-red-700 rounded`}>
                    <BiSolidError className='font-bold text-lg pt-0.5'/>
                    <p className='text-sm'>{error}</p>
                </div>

                <div className='justify-center flex pt-8 pb-3'>
                    <button className='text-sm px-4 py-1.5 bg-[#001D32] text-white rounded-md' onClick={handleStartClick}>
                        START
                    </button>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;