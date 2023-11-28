const ReceivedChatMessage = ({ sender, message, sent_time }) => {

    const timeGiven = sent_time.split(" ");
    const time = timeGiven[4].split(":")[0]+":"+timeGiven[4].split(":")[1];
    const date = timeGiven[1]+" "+timeGiven[2]+" "+timeGiven[3];
   
    return (
        <>
            {/* Message send by others */}
            <div className="chat-bubble max-w-[40%] bg-[#D8D8D8] rounded-tl-none rounded-xl px-4 py-2 mb-4">
                <h4 className="font-medium text-[#006399]">{sender}</h4>
                <p className="whitespace-normal text-justify">
                    {message}
                </p>
                <h4 className="font-regular text-sm text-gray-500 text-right">{time}</h4>
                <h4 className="font-regular text-xs text-gray-500 text-right">{date}</h4>
            </div>
        </>
    )
}

export default ReceivedChatMessage;