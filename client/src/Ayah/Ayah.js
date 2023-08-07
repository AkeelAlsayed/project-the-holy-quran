import React from "react";
import { Box, Text, List, ListItem, VStack, Center } from "@chakra-ui/react";
import Recorder from "../Recorder/Recorder";
import UserRecordings from "../UserRecordings/UserRecordings";
const Ayah = ({
  ayah,
  ayahIndex,
  state,
  translationSurahData,
  audioRefs,
  setCurrentAyah,
  selectedNumber,
}) => {
  // Create a unique ayahId by combining surah number and ayah number
  // const ayahId = ayahIndex;
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
  // Handle audio playback, catching and logging any errors
  const handlePlay = () => {
    stopAllAudios(`audio-${ayahIndex}`); // Stop all audios, excluding the current one
    audioRefs.current[ayahIndex]
      .play()
      .catch((error) => console.error("Failed to play audio:", error));
  };
  // console.log(ayah);

  return (
    <Center>
      <Box key={ayahIndex}>
        <Text fontSize="xl" color="blue.500" textAlign="center">
          Ayah Number: {ayah.number}
        </Text>
        <hr />
        <Text my={3} fontSize="lg" textAlign="center">
          {ayah.text}
        </Text>
        <List spacing={3}>
          {state.selectedTranslations.map((translationIdentifier) => {
            const translation =
              translationSurahData[translationIdentifier]?.ayahs[ayahIndex];
            return (
              translation && (
                <ListItem key={translationIdentifier}>
                  <VStack align="stretch">
                    <Text fontSize="2xl" color="yellow.300">
                      {translationIdentifier}
                    </Text>
                    <Text color="yellow.300">{translation.text}</Text>
                  </VStack>
                </ListItem>
              )
            );
          })}
        </List>
        <VStack>
          <audio
            controls
            id={`audio-${ayahIndex}`}
            key={ayah.audio}
            ref={(ref) => (audioRefs.current[ayahIndex] = ref)}
            onPlay={() => handlePlay(ayahIndex)}
            onEnded={() => {
              if (audioRefs.current[ayahIndex + 1]) {
                setCurrentAyah(ayahIndex + 1);
                audioRefs.current[ayahIndex + 1].play();
              }
            }}
          >
            <source src={ayah.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {/* Pass the ayahId prop to the Recorder component */}
          <Recorder ayah={ayah} selectedNumber={selectedNumber} />
          <UserRecordings ayah={ayah} selectedNumber={selectedNumber} />
        </VStack>
      </Box>
    </Center>
  );
};

export default Ayah;
