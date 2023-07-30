import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Recorder = () => {
  const [record, setRecord] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  // if there's no logged in user, don't render anything
  if (!user) return null;

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    await uploadToFirebase(recordedBlob);
  };

  const uploadToFirebase = async (recordedBlob) => {
    const storageRef = ref(storage, `audio/${user.uid}_${Date.now()}.webm`);
    try {
      await uploadBytes(storageRef, recordedBlob.blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div>
      <h2>Recorder</h2>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
    </div>
  );
};

export default Recorder;
