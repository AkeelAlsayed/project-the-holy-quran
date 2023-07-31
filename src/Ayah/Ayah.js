import React from "react";
import Recorder from "../Recorder/Recorder";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  ayahText: {
    marginBottom: "10px",
    fontSize: "22px",
    lineHeight: "1.5",
    textAlign: "center",
  },
  translationText: {
    color: "goldenrod",
    fontSize: "22px",
    textAlign: "center",
  },
  translationIdentifier: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "goldenrod",
    textAlign: "center",
    padding: "5px 20px",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "50%",
      height: "100%",
      transform: "translate(-50%, -50%) rotate(45deg)",
      background: "#FFF",
      boxShadow: "10px 10px 15px rgba(0,0,0,0.3)",
      zIndex: -1,
    },
  },
  ayahNumber: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#3f51b5",
    textAlign: "center",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const Ayah = ({
  ayah,
  ayahIndex,
  state,
  translationSurahData,
  audioRefs,
  setCurrentAyah,
  handleAudioPlay,
}) => {
  const classes = useStyles();

  return (
    <div key={ayahIndex}>
      <Typography variant="h6" className={classes.ayahNumber}>
        Ayah Number: {ayah.number}
      </Typography>
      <hr />
      <Typography variant="body1" className={classes.ayahText}>
        {ayah.text}
      </Typography>
      <List dense>
        {state.selectedTranslations.map((translationIdentifier) => {
          const translation =
            translationSurahData[translationIdentifier]?.ayahs[ayahIndex];
          return (
            translation && (
              <ListItem key={translationIdentifier}>
                <ListItemText
                  primary={
                    <Typography className={classes.translationIdentifier}>
                      {translationIdentifier}
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.translationText}>
                      {translation.text}
                    </Typography>
                  }
                />
              </ListItem>
            )
          );
        })}
      </List>
      <div className={classes.centered}>
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
      </div>
    </div>
  );
};

export default Ayah;
