import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  FormControl,
  Select,
  Text,
  List,
  ListItem,
  Image,
} from "@chakra-ui/react";
import icon from "../images/icons/donation-gf5437d159_1280.png";

// PayPal Button
const PayPalButton = () => {
  return (
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="Inlinex7@gmail.com" />
      <input type="hidden" name="currency_code" value="USD" />
      <Text fontSize="xl" textAlign="center">
        Support us:
      </Text>
      <Button variant="outline">
        <Image src={icon} alt="Donate" boxSize="35%" />
      </Button>
      <Image
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
    <Box id="myMenu" className={`menu ${isMenuOpen ? "open" : ""}`} p={5}>
      <Button variant="solid" colorScheme="red" onClick={toggleMenu} my={2}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <PayPalButton />
      <FormControl variant="filled" my={2}>
        <Text fontSize="md">Select a Surah number:</Text>
        <Select
          name="selectedNumber"
          onChange={handleChange}
          placeholder="Select option"
        >
          {Array.from({ length: 114 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" my={2}>
        <Text fontSize="md">Select an audio edition:</Text>
        {editionsWithAudio.length > 0 && (
          <Select
            name="selectedAudio"
            onChange={handleChange}
            placeholder="Select option"
          >
            {editionsWithAudio.map((edition) => (
              <option key={edition.identifier} value={edition.identifier}>
                {edition.name}
              </option>
            ))}
          </Select>
        )}
      </FormControl>
      <FormControl variant="filled" my={2}>
        {editionsWithTranslation.length > 0 && (
          <Box>
            <Text fontSize="md">Select translation editions:</Text>
            <Select
              name="selectedLanguage"
              onChange={handleChange}
              placeholder="Select option"
            >
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </Select>
            <List spacing={3}>
              {editionsWithTranslation
                .filter(
                  (edition) => edition.language === state.selectedLanguage
                )
                .map((edition) => (
                  <ListItem
                    key={edition.identifier}
                    className={`translation-option ${
                      state.selectedTranslations.includes(edition.identifier)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleTranslationChange(edition.identifier)}
                  >
                    {edition.name}
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
      </FormControl>
      <Text fontSize="xl">Selected Translations:</Text>
      <List spacing={3}>
        {editionsWithTranslation.length > 0 &&
          state.selectedTranslations.map((selectedTranslation) => {
            const edition = editionsWithTranslation.find(
              (edition) => edition.identifier === selectedTranslation
            );
            return (
              <ListItem
                key={selectedTranslation}
                className={`translation-option ${
                  state.selectedTranslations.includes(selectedTranslation)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleTranslationDelete(selectedTranslation)}
              >
                {edition.name} ({edition.language}){" "}
                <Button>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default Menu;
