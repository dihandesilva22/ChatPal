import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

const WelcomePage = () => {

    const navigate = useNavigate();

    const handleStartClick = () => {

        navigate('/dashboard');
    }

    return (
        <>
            <div className='bg-[#006399] py-4 sticky top-0 left-0 right-0 z-20'>
                {/* <button className='float-left px-3'>
                    <IoIosArrowBack className='text-3xl font-semibold pt-1 text-white' />
                </button> */}
                <h1 className='text-2xl font-semibold pl-5 text-white'>ChatPal</h1>
            </div>
            <div className='flex-col justify-center items-center m-0 h-full px-4 py-2'>
                <h2 className='text-xl font-semibold py-3 justify-center flex text-[#001D32]'>
                    Welcome to ChatPal!
                </h2>
                <div className='py-5'>
                    <input className='px-3 py-0.5 mb-3 border border-[#001D32]' placeholder='First Name' /> <br />
                    <input className='px-3 py-o.5 border border-[#001D32]' placeholder='Last Name' />
                </div>
                <div className='justify-center flex py-3'>
                    <button className='px-3 py-0.5 bg-[#001D32] text-white rounded-md' onClick={handleStartClick}>
                        START
                    </button>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;