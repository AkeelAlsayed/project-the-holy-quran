import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Recorder = () => {
  const classes = useStyles();
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
    <Container>
      <Typography variant="h5" component="h2" align="center">
        Recorder
      </Typography>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={startRecording}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={stopRecording}
      >
        Stop
      </Button>
    </Container>
  );
};

export default Recorder;
