import { CgMoreVerticalAlt } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const Chat = () => {

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
                <div className="chat-bg py-4 w-ful px-6 overflow-auto">

                    {/* Date */}
                    <div className="date flex justify-center mb-4">
                        <h2 className="text-sm font-medium py-0.5 px-4 text-[#001D32] bg-gray-300 rounded-md max-w-fit">
                            20th of November, 2023
                        </h2>
                    </div>

                    {/* Message send by others */}
                    <div className="chat-bubble max-w-[40%] bg-slate-200 rounded-tl-none rounded-xl px-4 py-2 mb-4">
                        <h4 className="font-medium text-[#006399]">Sender Name</h4>
                        <p className="whitespace-normal text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Iusto tempore eligendi recusandae nihil beatae! Ex distinctio accusamus magnam ratione?
                            Delectus alias dolores eos ullam aut molestias facilis sint voluptatem aspernatur.
                        </p>
                        <h4 className="font-regular text-sm text-gray-500 text-right">12:34</h4>
                    </div>

                    {/* Message send by others */}
                    <div className="chat-bubble max-w-[40%] bg-slate-200 rounded-tl-none rounded-xl px-4 py-2 mb-4">
                        <h4 className="font-medium text-[#006399]">Sender Name</h4>
                        <p className="whitespace-normal text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Iusto tempore eligendi recusandae nihil beatae! Ex distinctio accusamus magnam ratione?
                            Delectus alias dolores eos ullam aut molestias facilis sint voluptatem aspernatur.
                        </p>
                        <h4 className="font-regular text-sm text-gray-500 text-right">12:34</h4>
                    </div>

                    {/* Message send by user(me) */}
                    <div className="chat-bubble max-w-[40%] bg-slate-200 rounded-br-none rounded-xl px-4 py-2 mb-4 float-right">
                        <h4 className="font-medium text-[#006399]">Sender Name</h4>
                        <p className="whitespace-normal text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Iusto tempore eligendi recusandae nihil beatae! Ex distinctio accusamus magnam ratione?
                            Delectus alias dolores eos ullam aut molestias facilis sint voluptatem aspernatur.
                        </p>
                        <h4 className="font-regular text-sm text-gray-500 text-right">12:34</h4>
                    </div>
                </div>
            </div>

            {/* Write message */}
            <div className="flex items-center sticky px-3 bottom-0 left-0 py-5 gap-2 w-full bg-[#CDE5FF]">
                <input className="w-full border border-[#001D32] rounded-md px-3 py-1" placeholder="Send Message" />
                <button className="float-right bg-[#001D32] border text-white text-lg p-3 rounded-[50%] ml-auto">
                    <IoSend />
                </button>
            </div>
        </div>
    )
}

export default Chat;