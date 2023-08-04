import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

const UserRecordings = ({ ayahOrder }) => {
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Add a state for user

  useEffect(() => {
    const auth = getAuth();
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      // Cleanup listener on unmount
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const fetchAudioFile = async () => {
        try {
          const firestore = getFirestore(app);
          const docRef = doc(
            firestore,
            "recordings",
            `${user.uid}_${ayahOrder}`
          );
          const docSnapshot = await getDoc(docRef);

          console.log(docSnapshot); // Log snapshot for debugging

          if (docSnapshot.exists()) {
            const audioURL = docSnapshot.data().audioURL;
            if (audioURL !== "") {
              setAudioFileUrl(audioURL);
            }
          }
        } catch (error) {
          console.error("Error fetching recording:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAudioFile();
    } else {
      setLoading(false);
    }
  }, [user, ayahOrder]); // Listen to both user and ayahOrder changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {audioFileUrl && (
        <audio controls>
          <source src={audioFileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default UserRecordings;
