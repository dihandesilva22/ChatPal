const ReceivedChatMessage = ({ sender, message, sent_time }) => {

    return (
        <>
            {/* Message send by others */}
            <div className="chat-bubble max-w-[40%] bg-[#D8D8D8] rounded-tl-none rounded-xl px-4 py-2 mb-4">
                <h4 className="font-medium text-[#006399]">{sender}</h4>
                <p className="whitespace-normal text-justify">
                    {message}
                </p>
                <h4 className="font-regular text-sm text-gray-500 text-right">{sent_time}</h4>
            </div>
        </>
    )
}

export default ReceivedChatMessage;