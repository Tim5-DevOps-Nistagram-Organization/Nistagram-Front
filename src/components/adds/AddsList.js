import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PropTypes, { object } from "prop-types";
import { baseUrl } from "../../services/MediaService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "80%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function AddsList({ adds }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {adds.map((add, index) => (
          <GridListTile key={index}>
            <a target="_blank" href={add.websiteUrl} rel="noreferrer">
              <img
                src={baseUrl + add.mediaId}
                alt={"Ups"}
                style={{ width: "100%" }}
              />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

AddsList.propTypes = {
  adds: PropTypes.arrayOf(object).isRequired,
};

export default AddsList;
