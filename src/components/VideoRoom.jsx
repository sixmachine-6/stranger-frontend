import { useEffect, useRef, useState } from "react";
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};
function VideoRoom({ socket }) {
  const [mediaObject, setMediaObject] = useState(null);
  const [remoteObject, setRemoteObject] = useState(null);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(
    function () {
      async function accessVideoAndAudio() {
        try {
          const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          const remoteStream = new MediaStream();

          console.log("i am remote Stream", remoteStream);

          const peer = new RTCPeerConnection(servers);
          console.log(localStream.getTracks());
          localStream
            .getTracks()
            .forEach((track) => peer.addTrack(track, localStream));

          peer.ontrack = (event) => {
            console.log("event", event.streams);
            event.streams[0].getTracks().forEach((track) => {
              remoteStream.addTrack(track);
            });
          };

          setMediaObject(localStream);
          setRemoteObject(remoteStream);

          peer.onicecandidate = (e) => {
            if (e.candidate) {
              socket.emit("candidate", JSON.stringify(e.candidate));
            }
          };

          const offer = await peer.createOffer();
          await peer.setLocalDescription(new RTCSessionDescription(offer));

          socket.emit("offer", JSON.stringify(offer));

          socket.on("offer-sent", async (data) => {
            await peer.setRemoteDescription(new RTCSessionDescription(data));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            socket.emit("answer", JSON.stringify(answer));
          });

          socket.on("answer-sent", async (data) => {
            if (!peer.currentRemoteDescription) {
              peer.setRemoteDescription(new RTCSessionDescription(data));
            }
          });

          socket.on("candidate-sent", async (data) => {
            if (peer) {
              peer.addIceCandidate(data);
            }
          });

          console.log("aman", remoteStream.getTracks());
        } catch (err) {
          console.log(err);
          setMediaObject({
            status: "fail",
            message:
              "Could access your camera please provide access to the camera and audio",
          });
        }
      }
      accessVideoAndAudio();
    },
    [socket]
  );
  useEffect(() => {
    if (videoRef.current && mediaObject) {
      videoRef.current.srcObject = mediaObject; // Set the media stream here
    }
    console.log(remoteVideoRef);
    if (remoteVideoRef.current && remoteObject) {
      console.log("aman", remoteObject);
      remoteVideoRef.current.srcObject = remoteObject;
    }
  }, [mediaObject, remoteObject]);

  return (
    <div className="flex mx-auto">
      {mediaObject?.status === "fail" ? (
        <p className="bg-red-400 text-white  font-semibold px-2 m-2 p-3 rounded-2xl text-center">
          {mediaObject.message}
        </p>
      ) : (
        <div className="flex flex-col">
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            className="rounded-lg h-72"
          ></video>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="rounded-lg h-72"
          ></video>
        </div>
      )}
    </div>
  );
}

export default VideoRoom;
