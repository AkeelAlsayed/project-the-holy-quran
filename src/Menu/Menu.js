import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  Typography,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import icon from "../images/icons/donation-gf5437d159_1280.png";

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// PayPal Button
const PayPalButton = () => {
  return (
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="Inlinex7@gmail.com" />
      <input type="hidden" name="currency_code" value="USD" />
      <Typography variant="h6" align="center">
        Support us:
      </Typography>
      <Button variant="outlined">
        <img src={icon} alt="Donate" width="35%" />
      </Button>
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
  const classes = useStyles();

  return (
    <div
      id="myMenu"
      className={`menu ${isMenuOpen ? "open" : ""} ${classes.menu}`}
    >
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <PayPalButton />
      <FormControl variant="filled" className={classes.formControl}>
        <Typography variant="subtitle1">Select a Surah number:</Typography>
        <Select name="selectedNumber" onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 114 }, (_, i) => (
            <MenuItem key={i} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <Typography variant="subtitle1">Select an audio edition:</Typography>
        {editionsWithAudio.length > 0 && (
          <Select name="selectedAudio" onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {editionsWithAudio.map((edition) => (
              <MenuItem key={edition.identifier} value={edition.identifier}>
                {edition.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        {editionsWithTranslation.length > 0 && (
          <div>
            <Typography variant="subtitle1">
              Select translation editions:
            </Typography>
            <Select name="selectedLanguage" onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
            <List>
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
          </div>
        )}
      </FormControl>
      <Typography variant="h6">Selected Translations:</Typography>
      <List>
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
    </div>
  );
};

export default Menu;
