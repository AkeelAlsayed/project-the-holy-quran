import React from "react";
import { Typography, Paper, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    backgroundColor: "#1a1a2e", // dark background
    border: "3px solid goldenrod", // golden border
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "goldenrod", // golden title
    textAlign: "center",
    fontFamily: "'Courier New', Courier, monospace", // use a unique font
    textShadow: "2px 2px 4px #000000", // add some text shadow
  },
  divider: {
    backgroundColor: "goldenrod", // golden divider line
    height: "2px",
    margin: theme.spacing(2, 0),
  },
  text: {
    color: "#E5E5E5", // light grey text for contrast with dark background
    textAlign: "center", // center text
    margin: theme.spacing(0, 2), // add some horizontal margin
  },
}));

const SurahDetails = ({ audioSurahData }) => {
  const classes = useStyles();

  return (
    <div>
      {audioSurahData && (
        <Paper className={classes.paper} elevation={5}>
          <Typography variant="h4" className={classes.title}>
            {audioSurahData.name}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                Number: {audioSurahData.number}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                English Name: {audioSurahData.englishName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                Revelation Type: {audioSurahData.revelationType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                English Name Translation:{" "}
                {audioSurahData.englishNameTranslation}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                Number of Ayahs: {audioSurahData.numberOfAyahs}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default SurahDetails;
