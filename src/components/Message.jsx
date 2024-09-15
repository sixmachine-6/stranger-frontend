import Loader from "./Loader";

function Message({ message }) {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <Loader />
      <p className="font-semibold text-xl mt-4">{message}</p>
    </div>
  );
}

export default Message;
