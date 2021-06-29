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

function SearchUsers({ users, onView }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {users.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell style={{ width: "70%" }}>{user.username}</TableCell>
                <TableCell style={{ width: "22%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="field"
                    onClick={() => onView(user.username)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SearchUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

export default SearchUsers;
