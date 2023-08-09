import React, { useEffect, useState, useRef } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

import { Center } from "@chakra-ui/react";

const UserRecordings = ({ ayah, selectedNumber }) => {
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const audioRef = useRef(); // Create a ref to control the audio element

  // Function to stop all audios on the page, excluding the current audio
  const stopAllAudios = (currentAudioId) => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      if (audio.id !== currentAudioId) {
        // Exclude the current audio
        audio.pause();
        audio.currentTime = 0; // Reset the audio
      }
    });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const firestore = getFirestore(app);
      const docRef = doc(
        firestore,
        "recordings",
        `${user.uid}_${selectedNumber}_${ayah.numberInSurah}`
      );

      const unsubscribeSnapshot = onSnapshot(
        docRef,
        (docSnapshot) => {
          if (docSnapshot.exists() && docSnapshot.data().audioURL !== "") {
            const audioURL = docSnapshot.data().audioURL;
            setAudioFileUrl(audioURL);
          } else {
            // Reset the audioFileUrl if no new audio is found
            setAudioFileUrl("");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching recording:", error);
        }
      );

      return () => {
        // Unsubscribe from document updates on component unmount
        unsubscribeSnapshot();
      };
    } else {
      setLoading(false);
    }
  }, [user, ayah.numberInSurah, selectedNumber]);

  // Use an effect to update the audio player when audioFileUrl changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // This forces the audio element to update its source
    }
  }, [audioFileUrl]);

  // Handle audio playback, catching and logging any errors
  const handlePlay = () => {
    stopAllAudios(`userAudio-${ayah.numberInSurah}`); // Stop all audios, excluding the current one
    audioRef.current
      .play()
      .catch((error) => console.error("Failed to play userAudio:", error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Center>
      {audioFileUrl && (
        <audio
          ref={audioRef} // Attach the ref to the audio element
          controls
          id={`userAudio-${ayah.numberInSurah}`}
          onEnded={() => {
            const nextAudio = document.getElementById(
              `userAudio-${ayah.numberInSurah + 1}`
            );
            if (nextAudio) {
              nextAudio.play();
            }
          }}
          onPlay={handlePlay} // Call handlePlay when the audio is played
        >
          <source src={audioFileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </Center>
  );
};

export default UserRecordings;
