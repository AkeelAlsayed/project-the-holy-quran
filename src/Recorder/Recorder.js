import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import MicRecorder from "mic-recorder-to-mp3";
import app from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Recorder = ({ ayahId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage(app);

  const firestore = getFirestore(app);

  const buttonStyles = {
    width: "200px", // Change this to the value you want
  };

  const startRecording = () => {
    setIsSaved(false);
    setAudioURL("");
    const mp3Recorder = new MicRecorder({ bitRate: 128 });
    mp3Recorder
      .start()
      .then(() => {
        setIsRecording(true);
        setStatus("Started recording...");
        setRecorder(mp3Recorder);
      })
      .catch((e) => console.error(e));
  };

  const stopRecording = () => {
    if (recorder) {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          setIsRecording(false);
          setStatus(
            "Stopped recording. Click Save to upload or Play to listen."
          );
        })
        .catch((e) => console.error(e));
      setRecorder(null);
    } else {
      console.error("Tried to stop recording but it was not ready.");
    }
  };

  const uploadToFirebase = async () => {
    if (!user) {
      setStatus("User not signed in");
      return;
    }
    const response = await fetch(audioURL);
    const blob = await response.blob();
    const storageRef = ref(storage, `audio/${user.uid}/${ayahId}.mp3`);
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setStatus("File uploaded. File available at: " + downloadURL);
      setIsSaved(true);

      // Firestore part
      const docRef = doc(firestore, `recordings/${user.uid}_${ayahId}`);
      await setDoc(docRef, {
        uid: user.uid,
        ayahOrder: ayahId,
        audioURL: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center">
        Recorder
      </Heading>
      <VStack spacing={4} align="stretch" mt={5}>
        <Text>{status}</Text>
        <Button
          colorScheme="teal"
          onClick={startRecording}
          disabled={isRecording}
          style={buttonStyles}
        >
          Start
        </Button>
        <Button
          colorScheme="red"
          onClick={stopRecording}
          disabled={!isRecording}
          style={buttonStyles}
        >
          Stop
        </Button>
        {!isSaved && (
          <Button
            colorScheme="blue"
            onClick={uploadToFirebase}
            disabled={!audioURL}
            style={buttonStyles}
          >
            Save
          </Button>
        )}
        {audioURL && (
          <Box>
            <audio controls>
              <source src={audioURL} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Recorder;
