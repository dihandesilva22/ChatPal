import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Dashboard = () => {

    const navigate = useNavigate();

    const handleViewClick = () => {

        navigate('/chat');

    }

    return (
        <>
            <div className='bg-[#006399] py-4 sticky top-0 left-0 right-0 z-20'>
                <button className='float-left px-3'>
                    <IoIosArrowBack className='text-3xl font-semibold pt-1 text-white' />
                </button>
                <h1 className='text-2xl font-semibold pl-5 text-white'>ChatPal</h1>
            </div>
            <div className="w-full px-4 py-2">
                <h2 className="text-2xl font-semibold py-7 text-[#001D32]">
                    Hello User!
                </h2>

                <h2 className="text-lg font-semibold py-1.5 px-3 text-[#001D32] bg-[#CDE5FF] rounded-t-md">
                    Active Chats
                </h2>
                <hr className="text-[#001D32]" />

                <div className="flex items-center py-7">
                    <p className="font-medium pl-3">
                        Chat Name
                    </p>
                    <button className="float-right bg-[#001D32] text-white text-sm px-3 py-0.5 rounded-md ml-auto" onClick={handleViewClick}>
                        View
                    </button>
                </div>

                <div className="fixed left-0 bottom-0 w-full">

                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li class="me-2">
                            <a href="#" aria-current="page" class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
                                Active Chats</a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                                Previous Chats</a>
                        </li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default Dashboard;