function Tagline() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="bg-slate-300 p-1 rounded-md mx-auto mt-2">{today}</p>

      <p className="bg-yellow-200 px-2 m-2 p-3 rounded-2xl text-center">
        Messages and calls are end-to-end encrypted.No one outside od this chat,
        not even me, can read or listen to them.Tap to learn more.
      </p>
    </div>
  );
}

export default Tagline;
