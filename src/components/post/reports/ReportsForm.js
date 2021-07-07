import PropTypes from "prop-types";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { base } from "../../../services/Utils";

function ReportsForm({ reports, onDecision }) {
  const baseUrl = base + "media/media/";
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Media</TableCell>
            <TableCell>Requester username</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "30%" }}>
                <img
                  src={baseUrl + report.mediaId}
                  alt={"Ups"}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell style={{ width: "25%" }}>
                <h3>{report.requesterUsername}</h3>
              </TableCell>
              <TableCell style={{ width: "25%" }}>
                <p>{report.description}</p>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onDecision(report.id, true)}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDecision(report.id, false)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ReportsForm.propTypes = {
  reports: PropTypes.array.isRequired,
  onDecision: PropTypes.func.isRequired,
};

export default ReportsForm;
