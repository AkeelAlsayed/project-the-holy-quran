import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import icon from "../images/icons/donation-gf5437d159_1280.png";

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
const Menu = ({
  isMenuOpen,
  toggleMenu,
  handleChange,
  handleTranslationChange,
  handleTranslationDelete,
  state,
  languages,
  editionsWithAudio,
  editionsWithTranslation,
}) => {
  return (
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
                .filter((edition) => edition.language === state.selectedLanguage)
                .map((edition) => (
                  <div
                    key={edition.identifier}
                    className={`translation-option ${
                      state.selectedTranslations.includes(edition.identifier)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleTranslationChange(edition.identifier)}
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
  );
};

export default Menu;
