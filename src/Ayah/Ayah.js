import React from "react";

const Ayah = ({ ayah, ayahIndex, state, translationSurahData, audioRefs, setCurrentAyah, handleAudioPlay }) => {
    return (
    <div key={ayahIndex}>
      <p className="surah-property-small">Ayah Number: {ayah.number}</p>
      <hr />
      <p className="ayah-text">{ayah.text}</p>
      <ul className="ayah-translations-list">
        {state.selectedTranslations.map((translationIdentifier) => {
          const translation = translationSurahData[translationIdentifier]?.ayahs[ayahIndex];
          return (
            translation && (
              <li className="ayah-translation-item" key={translationIdentifier}>
                <div className="translationIdentifier">{translationIdentifier}</div>
                <div className="translationText">{translation.text}</div>
              </li>
            )
          );
        })}
      </ul>
                <audio
            controls
            key={ayah.audio}
            ref={(ref) => (audioRefs.current[ayahIndex] = ref)}
            onPlay={() => handleAudioPlay(ayahIndex)} // Use handleAudioPlay prop
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
};

export default Ayah;
