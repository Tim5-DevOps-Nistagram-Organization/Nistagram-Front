import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import { ROLE_AGENT } from "../../../model/Role";
import { useHistory } from "react-router-dom";

function CampaignView({ campaign, baseUrl, open, role, onClose, onDelete }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={"body"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <h3>Start date: {campaign.startDate}</h3>
        <h3>End date: {campaign.endDate}</h3>
        <h3>Num of shows per day: {campaign.numShowsPerDay}</h3>
        {campaign.advertisements.map((add, index) => (
          <img
            key={index}
            src={baseUrl + add.mediaId}
            alt={"Ups"}
            style={{ width: "100%" }}
          />
        ))}

        {role === ROLE_AGENT && (
          <Button
            onClick={() => onDelete()}
            style={{ width: "100%" }}
            color="secondary"
            variant="outlined"
          >
            Delete
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

CampaignView.propTypes = {
  campaign: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CampaignView;
