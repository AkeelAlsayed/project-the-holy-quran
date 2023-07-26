import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import icon from "./images/icons/donation-gf5437d159_1280.png";

const PayPalButton = () => {
  return (
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="Inlinex7@gmail.com" />
      <input type="hidden" name="currency_code" value="USD" />
      <h3>Support us:</h3>
      <input
        type="image"
        src={icon}
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
        width="35%"
        style={{ display: "flex", justifySelf: "center" }}
      />
      <img
        alt=""
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  );
};

export default function App() {
  const [state, setState] = useState({
    selectedNumber: "1",
    selectedAudio: "ar.alafasy",
    selectedTranslations: ["en.sahih"],
    selectedLanguage: "English"
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
      [name]: value
    }));
  };

  const handleTranslationChange = (selectedIdentifier) => {
    if (state.selectedTranslations.includes(selectedIdentifier)) {
      setState((prevState) => ({
        ...prevState,
        selectedTranslations: prevState.selectedTranslations.filter(
          (identifier) => identifier !== selectedIdentifier
        )
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        selectedTranslations: [
          ...prevState.selectedTranslations,
          selectedIdentifier
        ]
      }));
    }
  };

  const handleTranslationDelete = (editionIdentifier) => {
    setState((prevState) => ({
      ...prevState,
      selectedTranslations: prevState.selectedTranslations.filter(
        (edition) => edition !== editionIdentifier
      )
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
    <div className="nav-bar">
      <button className="menuBtn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div id="myMenu" className={`menu ${isMenuOpen ? "open" : ""}`}>
        <button className="closeBtn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {/* PayPalButton added here */}
        <div className="donate-button">
          {/* <h2>Support Us:</h2> */}
          <PayPalButton />
        </div>
        <div>
          <label>Select a Surah number</label>
          <select name="selectedNumber" onChange={handleChange}>
            <option value="">Select a Surah number</option>
            {Array.from({ length: 114 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select an audio edition</label>
          {editionsWithAudio.length > 0 && (
            <select name="selectedAudio" onChange={handleChange}>
              <option value="">Select an audio edition</option>
              {editionsWithAudio.map((edition) => (
                <option key={edition.identifier} value={edition.identifier}>
                  {edition.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          {editionsWithTranslation.length > 0 && (
            <div>
              <label>Select translation editions:</label>
              <select name="selectedLanguage" onChange={handleChange}>
                <option value="">Select a language</option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <div>
                {editionsWithTranslation
                  .filter(
                    (edition) => edition.language === state.selectedLanguage
                  )
                  .map((edition) => (
                    <div
                      key={edition.identifier}
                      className={`translation-option ${
                        state.selectedTranslations.includes(edition.identifier)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleTranslationChange(edition.identifier)
                      }
                    >
                      {edition.name}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2>Selected Translations:</h2>
          <div>
            {editionsWithTranslation.length > 0 &&
              state.selectedTranslations.map((selectedTranslation) => {
                const edition = editionsWithTranslation.find(
                  (edition) => edition.identifier === selectedTranslation
                );
                return (
                  <div
                    key={selectedTranslation}
                    className={`translation-option ${
                      state.selectedTranslations.includes(selectedTranslation)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleTranslationDelete(selectedTranslation)}
                  >
                    {edition.name} ({edition.language}){" "}
                    <button>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={`main-content  ${isMenuOpen ? "open" : "shift"}`}>
        <h1 className="h1-heading">The Holy Quran</h1>
        <div>
          {audioSurahData && (
            <div>
              <h1 className="h1-heading">{audioSurahData.name}</h1>
              <p className="surah-property-small">
                Number: {audioSurahData.number}
              </p>
              <p className="surah-property-small">
                English Name: {audioSurahData.englishName}
              </p>
              <p className="surah-property-small">
                English Name Translation:{" "}
                {audioSurahData.englishNameTranslation}
              </p>
              <p className="surah-property-small">
                Revelation Type: {audioSurahData.revelationType}
              </p>
              <p className="surah-property-small">
                Number of Ayahs: {audioSurahData.numberOfAyahs}
              </p>
            </div>
          )}
        </div>

        <div>
          {audioSurahData &&
            audioSurahData.ayahs &&
            audioSurahData.ayahs.map((ayah, ayahIndex) => {
              return (
                <div key={ayahIndex}>
                  <p className="surah-property-small">
                    Ayah Number: {ayah.number}
                  </p>
                  <hr />
                  <p className="ayah-text">{ayah.text}</p>
                  <ul className="ayah-translations-list">
                    {state.selectedTranslations.map((translationIdentifier) => {
                      const translation =
                        translationSurahData[translationIdentifier]?.ayahs[
                          ayahIndex
                        ];
                      return (
                        translation && (
                          <li
                            className="ayah-translation-item"
                            key={translationIdentifier}
                          >
                            <div className="translationIdentifier">
                              {translationIdentifier}
                            </div>
                            <div className="translationText">
                              {translation.text}
                            </div>
                          </li>
                        )
                      );
                    })}
                  </ul>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
