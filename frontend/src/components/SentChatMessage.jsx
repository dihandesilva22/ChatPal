const SentChatMessage = ({ message, sent_time }) => {

    return (
        <>
            <div className="chat-bubble max-w-[40%] bg-slate-200 rounded-br-none rounded-xl px-4 py-2 mb-4 float-right">
                <h4 className="font-medium text-[#006399]">You</h4>
                <p className="whitespace-normal text-justify">
                    {message}
                </p>
                <h4 className="font-regular text-sm text-gray-500 text-right">{sent_time}</h4>
            </div>
        </>
    )

}

export default SentChatMessage;