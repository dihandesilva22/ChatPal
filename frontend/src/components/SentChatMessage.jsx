const SentChatMessage = ({ message, sent_time }) => {

    return (
        <>
            <div className="chat-bubble max-w-[40%] bg-[#218aff] text-white rounded-br-none rounded-xl px-4 py-2 mb-4 ml-auto">
                {/* <h4 className="font-medium text-gray-300">You</h4> */}
                <p className="whitespace-normal text-justify">
                    {message}
                </p>
                <h4 className="font-regular text-sm text-[#CDE5FF] text-right">{sent_time}</h4>
            </div>
        </>
    )

}

export default SentChatMessage;