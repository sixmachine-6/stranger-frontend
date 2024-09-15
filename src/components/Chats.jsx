import ChatItem from "../ui/ChatItem";

function Chats({ chats }) {
  console.log(chats);

  return (
    <ul className=" m-2">
      {chats.map((chat, index) => (
        <ChatItem chat={chat} key={index} />
      ))}
    </ul>
  );
}

export default Chats;
