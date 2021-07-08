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

function FollowRequestsForm({ users, onView, onDecision }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "40%" }}>
                <h3>{user}</h3>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onView(user)}
                >
                  View
                </Button>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onDecision(user, true)}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDecision(user, false)}
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

FollowRequestsForm.propTypes = {
  users: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
  onDecision: PropTypes.func.isRequired,
};

export default FollowRequestsForm;
