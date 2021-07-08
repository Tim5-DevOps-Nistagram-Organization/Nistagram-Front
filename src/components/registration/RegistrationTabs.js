import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Paper, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function RegistrationTabs({ value, onChange }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Regular registration" />
        <Tab label="Agent registration request" />
      </Tabs>
    </Paper>
  );
}

RegistrationTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RegistrationTabs;
