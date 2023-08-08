import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, Heading, VStack, Text, Center } from "@chakra-ui/react";
import MicRecorder from "mic-recorder-to-mp3";
import app from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Recorder = ({ ayah, selectedNumber }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  const buttonStyles = { width: "200px" };

  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .normalize("NFKD")
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/ٱ/g, "ا")
      .replace(/ٰ/g, "")
      .trim();
  };

  const levenshtein = (a, b) => {
    const matrix = [];
    let i, j;

    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };
  console.log("Selected Number:", selectedNumber);

  const startRecording = () => {
    setIsRecording(true);
    const mp3Recorder = new MicRecorder({ bitRate: 128 });
    mp3Recorder
      .start()
      .then(() => {
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

  const handleRecordingButton = () => {
    if (isRecording) {
      stopRecording();
    } else if (audioURL && status === "The audio you uploaded is not Ayah.") {
      setAudioURL("");
      setStatus("");
      startRecording();
    } else {
      startRecording();
    }
  };

  const uploadToFirebase = async () => {
    if (!audioURL) {
      setStatus("No audio to upload");
      return;
    }

    const responseBlob = await fetch(audioURL);
    const blob = await responseBlob.blob();
    const formData = new FormData();
    formData.append("audio", blob);
    const response = await fetch(`http://localhost:3000/transcribe`, {
      method: "POST",
      body: formData,
    });
    const transcriptionResult = await response.json();
    const transcribedText = normalizeText(transcriptionResult.text);
    const expectedText = normalizeText(ayah.text);

    console.log(transcribedText);
    console.log(expectedText);
    const distance = levenshtein(transcribedText, expectedText);
    console.log(distance);

    const isSimilar = distance <= 10;

    if (isSimilar) {
      const storageRef = ref(
        storage,
        `audio/${user.uid}/${selectedNumber}_${ayah.numberInSurah}.mp3`
      );
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setStatus("Ayah was uploaded successfully.");

      const docRef = doc(
        firestore,
        `recordings/${user.uid}_${selectedNumber}_${ayah.numberInSurah}`
      );
      await setDoc(docRef, {
        uid: user.uid,
        surahNumber: selectedNumber, // Include the surah number
        ayahNumberInSurah: ayah.numberInSurah,
        audioURL: downloadURL,
      });
      setAudioURL("");
    } else {
      setStatus("The audio you uploaded is not Ayah.");
    }
  };

  return (
    <Center>
      <Box p={5}>
        <Heading as="h2" size="lg" textAlign="center">
          Recorder
        </Heading>
        <VStack spacing={4} align="center" mt={5}>
          <Text>{status}</Text>
          <Button
            colorScheme={isRecording ? "red" : "teal"}
            onClick={handleRecordingButton}
            style={buttonStyles}
          >
            {isRecording
              ? "Stop"
              : audioURL && status === "The audio you uploaded is not Ayah."
              ? "Retry"
              : "Start"}
          </Button>
          <Button
            colorScheme="blue"
            onClick={uploadToFirebase}
            disabled={!audioURL}
            style={buttonStyles}
          >
            Save
          </Button>
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
    </Center>
  );
};

export default Recorder;
