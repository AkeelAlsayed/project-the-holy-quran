import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import Menu from "../Menu/Menu";
import SurahDetails from "../SurahDetails/SurahDetails";
import Ayah from "../Ayah/Ayah";

const QuranPlayer = () => {
  const [state, setState] = useState({
    selectedNumber: "1",
    selectedAudio: "ar.alafasy",
    selectedTranslations: ["en.sahih"],
    selectedLanguage: "English",
  });

  const [editionsWithAudio, setEditionsWithAudio] = useState([]);
  const [editionsWithTranslation, setEditionsWithTranslation] = useState([]);
  const [audioSurahData, setAudioSurahData] = useState(null);
  const [translationSurahData, setTranslationSurahData] = useState({});

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentAyah, setCurrentAyah] = useState(0);

  const audioRefs = useRef([]);

  const languages = Array.from(
    new Set(editionsWithTranslation.map((edition) => edition.language))
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTranslationChange = (selectedIdentifier) => {
    if (state.selectedTranslations.includes(selectedIdentifier)) {
      setState((prevState) => ({
        ...prevState,
        selectedTranslations: prevState.selectedTranslations.filter(
          (identifier) => identifier !== selectedIdentifier
        ),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        selectedTranslations: [
          ...prevState.selectedTranslations,
          selectedIdentifier,
        ],
      }));
    }
  };

  const handleTranslationDelete = (editionIdentifier) => {
    setState((prevState) => ({
      ...prevState,
      selectedTranslations: prevState.selectedTranslations.filter(
        (edition) => edition !== editionIdentifier
      ),
    }));
  };

  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const audioResponse = await fetch(
          "https://api.alquran.cloud/v1/edition/format/audio"
        );
        const audioData = await audioResponse.json();
        setEditionsWithAudio(audioData.data);

        const translationResponse = await fetch(
          "https://api.alquran.cloud/v1/edition/type/translation"
        );
        const translationData = await translationResponse.json();
        setEditionsWithTranslation(translationData.data);
      } catch (error) {
        console.error("Error fetching editions data:", error);
      }
    };

    fetchEditions();
  }, []);

  useEffect(() => {
    const fetchSurahData = async () => {
      if (state.selectedNumber !== "" && state.selectedAudio !== "") {
        try {
          const audioResponse = await fetch(
            `https://api.alquran.cloud/v1/surah/${state.selectedNumber}/${state.selectedAudio}`
          );
          const audioData = await audioResponse.json();
          setAudioSurahData(audioData.data);

          const allTranslationsData = {};
          for (const edition of state.selectedTranslations) {
            const response = await fetch(
              `https://api.alquran.cloud/v1/surah/${state.selectedNumber}/${edition}`
            );
            const data = await response.json();
            allTranslationsData[edition] = data.data;
          }
          setTranslationSurahData(allTranslationsData);
        } catch (error) {
          console.error("Error fetching surah data:", error);
        }
      }
    };

    fetchSurahData();
  }, [state.selectedNumber, state.selectedAudio, state.selectedTranslations]);

  return (
    <VStack p={5}>
      <IconButton
        variant="outline"
        colorScheme="blue"
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={toggleMenu}
      />
      <Drawer placement="left" onClose={toggleMenu} isOpen={isMenuOpen}>
        <DrawerOverlay>
          <DrawerContent backgroundColor="#f7f7f7">
            <DrawerBody>
              <Menu
                toggleMenu={toggleMenu}
                handleChange={handleChange}
                handleTranslationChange={handleTranslationChange}
                handleTranslationDelete={handleTranslationDelete}
                state={state}
                languages={languages}
                editionsWithAudio={editionsWithAudio}
                editionsWithTranslation={editionsWithTranslation}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Box w="100%" className={`main-content ${isMenuOpen ? "open" : "shift"}`}>
        <Heading as="h2" size="xl" textAlign="center">
          The Holy Quran
        </Heading>
        <SurahDetails audioSurahData={audioSurahData} />
        {audioSurahData &&
          audioSurahData.ayahs &&
          audioSurahData.ayahs.map((ayah, ayahIndex) => (
            <Ayah
              key={ayahIndex}
              ayah={ayah}
              ayahIndex={ayahIndex}
              state={state}
              translationSurahData={translationSurahData}
              audioRefs={audioRefs}
              setCurrentAyah={setCurrentAyah}
            />
          ))}
      </Box>
    </VStack>
  );
};

export default QuranPlayer;
