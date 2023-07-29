import React from "react";

const SurahDetails = ({ audioSurahData }) => {
  return (
    <div>
      {audioSurahData && (
        <div>
          <h1 className="h1-heading">{audioSurahData.name}</h1>
          <p className="surah-property-small">Number: {audioSurahData.number}</p>
          <p className="surah-property-small">
            English Name: {audioSurahData.englishName}
          </p>
          <p className="surah-property-small">
            English Name Translation: {audioSurahData.englishNameTranslation}
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
  );
};

export default SurahDetails;
