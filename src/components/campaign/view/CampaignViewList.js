import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PropTypes, { object } from "prop-types";
import { newCampaign } from "../../../model/Campaign";
import { baseUrl } from "../../../services/MediaService";
import CampaignView from "./CampaignView";
import { connect } from "react-redux";
import * as CampaingService from "../../../services/CampaignService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

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

function CampaignViewList({ campaigns, role }) {
  const [campaign, setCampaign] = useState(newCampaign);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  function handleOnView(index) {
    setCampaign(campaigns[index]);
    setOpen(true);
  }

  function handleDelete() {
    CampaingService.deleteCampaign(campaign.id)
      .then((message) => {
        toast.success(message);
        history.push("/");
      })
      .catch((error) => toast.error(error.message));
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {campaigns.map((c, index) => (
          <GridListTile key={index}>
            <img
              src={baseUrl + c.advertisements[0].mediaId}
              alt={"Ups"}
              onClick={() => handleOnView(index)}
            />
          </GridListTile>
        ))}
      </GridList>
      <CampaignView
        campaign={campaign}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
        role={role}
        baseUrl={baseUrl}
      />{" "}
    </div>
  );
}

CampaignViewList.propTypes = {
  campaigns: PropTypes.arrayOf(object).isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    role: state.userRole,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignViewList);
