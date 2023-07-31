import React from "react";
import Recorder from "../Recorder/Recorder";
import {
  Box,
  Text,
  List,
  ListItem,
  useStyleConfig,
  VStack,
} from "@chakra-ui/react";

const Ayah = ({
  ayah,
  ayahIndex,
  state,
  translationSurahData,
  audioRefs,
  setCurrentAyah,
  handleAudioPlay,
}) => {
  return (
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
          key={ayah.audio}
          ref={(ref) => (audioRefs.current[ayahIndex] = ref)}
          onPlay={() => handleAudioPlay(ayahIndex)}
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
        <Recorder />
      </VStack>
    </Box>
  );
};

export default Ayah;
