function Welcome({ socket, setStatus }) {
  function handlePairing() {
    socket.emit("pair");
    setStatus("pairing");
  }
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-4">
      <p className="font-semibold text-xl mt-4">Welcome to world of chats!!!</p>
      <button
        onClick={handlePairing}
        className="bg-green-300 rounded-lg p-2 text-lg "
      >
        Get Started
      </button>
    </div>
  );
}

export default Welcome;
