// import express from "express";
// import fetch from "node-fetch";
// import fs from "fs";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   const data = fs.readFileSync("audios/Recording(27).m4a"); // Updated path to your audio file
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//     {
//       headers: {
//         Authorization: "Bearer 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",
//       },
//       method: "POST",
//       body: data,
//     }
//   );
//   const result = await response.json();
//   res.json(result);
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from "express";
// import fetch from "node-fetch";
// import fs from "fs";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   try {
//     const data = fs.readFileSync("audios/audioForTest.mp3"); // Updated path to your audio file
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//         },
//         method: "POST",
//         body: data,
//       }
//     );
//     const result = await response.json();
//     console.log("Transcription Result:", result); // Logs the result to the backend console
//     res.status(200).send("Transcription successful!"); // Sends success response to the client
//   } catch (error) {
//     console.error("An error occurred:", error); // Logs any error to the backend console
//     res.status(500).send("An error occurred during transcription"); // Sends error response to the client
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from "express";
// import fetch from "node-fetch";
// import fs from "fs";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   try {
//     const data = fs.readFileSync("audios/audioForTest.mp3"); // Updated path to your audio file
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//         },
//         method: "POST",
//         body: data,
//       }
//     );
//     const result = await response.json();
//     console.log("Transcription Result:", result); // Logs the result to the backend console
//     res.json(result); // Sends JSON response to the client
//   } catch (error) {
//     console.error("An error occurred:", error); // Logs any error to the backend console
//     res.status(500).send("An error occurred during transcription"); // Sends error response to the client
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   try {
//     const audioURL =
//       "https://firebasestorage.googleapis.com/v0/b/quran-c04a0.appspot.com/o/audio%2Fuezbb5OlHMV3AoDhGlvSQyBuDIn1%2F5.mp3?alt=media&token=1ad541c6-c311-4b57-bcd0-ca09429a2d79";

//     // Fetch audio data from the given URL
//     const audioResponse = await fetch(audioURL);
//     const data = await audioResponse.buffer();

//     // Send the audio data to the transcription service
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//         },
//         method: "POST",
//         body: data,
//       }
//     );

//     const result = await response.json();
//     console.log("Transcription Result:", result); // Logs the result to the backend console
//     res.json(result); // Sends JSON response to the client
//   } catch (error) {
//     console.error("An error occurred:", error); // Logs any error to the backend console
//     res.status(500).send("An error occurred during transcription"); // Sends error response to the client
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   try {
//     const audioURL = req.query.audioURL;

//     // Fetch audio data from the given URL
//     const audioResponse = await fetch(audioURL);
//     const data = await audioResponse.buffer();

//     // Send the audio data to the transcription service
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//         },
//         method: "POST",
//         body: data,
//       }
//     );

//     const result = await response.json();
//     console.log("Transcription Result:", result);
//     res.json(result);
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).send("An error occurred during transcription");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// const uploadToFirebase = async () => {
//   if (!user) {
//     setStatus("User not signed in");
//     return;
//   }

//   // Fetch the transcription from the backend
//   const response = await fetch(
//     `http://localhost:3000/transcribe?audioURL=${audioURL}`
//   );
//   const transcriptionResult = await response.json();

//   // Assuming transcriptionResult contains the transcribed text
//   const transcribedText = transcriptionResult.text;

//   // Check if the transcribed text does not match the expected Ayah text
//   if (transcribedText !== ayah) {
//     setStatus(
//       "The transcribed text does not match the Ayah. Please try again."
//     );
//     return;
//   }

//   const responseBlob = await fetch(audioURL);
//   const blob = await responseBlob.blob();
//   const storageRef = ref(storage, `audio/${user.uid}/${ayahId}.mp3`);
//   try {
//     await uploadBytes(storageRef, blob);
//     const downloadURL = await getDownloadURL(storageRef);
//     setStatus("File uploaded. File available at: " + downloadURL);
//     setIsSaved(true);

//     const docRef = doc(firestore, `recordings/${user.uid}_${ayahId}`);
//     await setDoc(docRef, {
//       uid: user.uid,
//       ayahOrder: ayahId,
//       audioURL: downloadURL,
//     });

//     setAudioURL("");
//   } catch (error) {
//     console.error("Error uploading audio:", error);
//   }
// };

// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/transcribe", async (req, res) => {
//   try {
//     const audioURL = "req.query.audioURL";

//     // Validate the audio URL
//     if (!audioURL) {
//       res.status(400).send("Missing audio URL");
//       return;
//     }

//     // Fetch audio data from the given URL
//     const audioResponse = await fetch(audioURL);
//     const data = await audioResponse.buffer();

//     // Send the audio data to the transcription service
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//         },
//         method: "POST",
//         body: data,
//       }
//     );

//     const result = await response.json();
//     console.log("Transcription Result:", result); // Logs the result to the backend console
//     res.json(result); // Sends JSON response to the client
//   } catch (error) {
//     console.error("An error occurred:", error); // Logs any error to the backend console
//     res.status(500).send("An error occurred during transcription"); // Sends error response to the client
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from "express";
import fileUpload from "express-fileupload";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());

app.post("/transcribe", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No audio file was uploaded.");
    }
    const audioFile = req.files.audio;
    const data = audioFile.data;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();
    console.log("Transcription Result:", result);
    res.json(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred during transcription");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
