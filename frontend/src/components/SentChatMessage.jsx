const SentChatMessage = ({ message, sent_time }) => {

    const timeGiven = sent_time.split(" ");
    const time = timeGiven[4].split(":")[0]+":"+timeGiven[4].split(":")[1];
    const date = timeGiven[1]+" "+timeGiven[2]+" "+timeGiven[3];

    return (
        <>
            <div className="chat-bubble max-w-[40%] bg-[#218aff] text-white rounded-br-none rounded-xl px-4 py-2 mb-4 ml-auto">
                {/* <h4 className="font-medium text-gray-300">You</h4> */}
                <p className="whitespace-normal text-justify">
                    {message}
                </p>
                <h4 className="font-regular text-sm text-[#CDE5FF] text-right">{time}</h4>
                <h4 className="font-regular text-xs text-[#CDE5FF] text-right">{date}</h4>
            </div>
        </>
    )

}

export default SentChatMessage;