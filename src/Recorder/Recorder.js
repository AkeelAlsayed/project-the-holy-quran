import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import MicRecorder from "mic-recorder-to-mp3";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  // if there's no logged in user, don't render anything
  if (!user) return null;

  const Mp3Recorder = new MicRecorder({ bitRate: 128 });

  const startRecording = () => {
    Mp3Recorder.start()
      .then(() => {
        setIsRecording(true);
      })
      .catch((e) => console.error(e));
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        setIsRecording(false);
        await uploadToFirebase(blob);
      })
      .catch((e) => console.error(e));
  };

  const uploadToFirebase = async (blob) => {
    const storageRef = ref(storage, `audio/${user.uid}_${Date.now()}.mp3`);
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
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
        <Button
          colorScheme="teal"
          onClick={startRecording}
          disabled={isRecording}
        >
          Start
        </Button>
        <Button
          colorScheme="red"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop
        </Button>
      </VStack>
    </Box>
  );
};

export default Recorder;
