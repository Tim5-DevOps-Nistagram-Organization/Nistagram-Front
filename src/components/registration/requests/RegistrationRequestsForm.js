import PropTypes from "prop-types";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

function RegistrationRequestsForm({ agents, onDecision }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {agents.map((agent, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "20%" }}>
                <h3>{agent.username}</h3>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <h3>{agent.email}</h3>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <h3>{agent.websiteUrl}</h3>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onDecision(agent.id, true)}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDecision(agent.id, false)}
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

RegistrationRequestsForm.propTypes = {
  agents: PropTypes.array.isRequired,
  onDecision: PropTypes.func.isRequired,
};

export default RegistrationRequestsForm;
