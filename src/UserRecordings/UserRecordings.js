import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const UserRecordings = ({ user, ayah }) => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      // Check if user exists before fetching audio files
      if (user) {
        const storage = getStorage();
        const listRef = ref(storage, `audio/${user.uid}/${ayah.number}`);

        try {
          const res = await listAll(listRef);
          const files = await Promise.all(
            res.items.map((item) => getDownloadURL(item))
          );
          setAudioFiles(files);
        } catch (error) {
          console.error("Error fetching user's audio files:", error);
        }
      }
    };

    fetchAudioFiles();
  }, [user, ayah]);

  return (
    <div>
      {audioFiles.map((audioFileUrl, index) => (
        <audio key={index} controls>
          <source src={audioFileUrl} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
};

export default UserRecordings;
