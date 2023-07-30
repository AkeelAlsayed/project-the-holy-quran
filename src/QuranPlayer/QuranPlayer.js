import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

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

  const handleAudioPlay = (currentPlaying) => {
    audioRefs.current.forEach((audio, index) => {
      if (audio && index !== currentPlaying) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setCurrentAyah(currentPlaying);
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
    <Box sx={{ flexGrow: 1 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleChange={handleChange}
        handleTranslationChange={handleTranslationChange}
        handleTranslationDelete={handleTranslationDelete}
        state={state}
        languages={languages}
        editionsWithAudio={editionsWithAudio}
        editionsWithTranslation={editionsWithTranslation}
      />
      <Box>
        <Typography variant="h3" component="div" gutterBottom>
          The Holy Quran
        </Typography>
        <SurahDetails audioSurahData={audioSurahData} />
      </Box>
      <Box>
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
              handleAudioPlay={handleAudioPlay} // Pass handleAudioPlay as a prop
            />
          ))}
      </Box>
    </Box>
  );
};

export default QuranPlayer;
