import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

function ProfileViewFromat({ user }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell style={{ width: "60%" }}>
              <h3>{user.username}</h3>
            </TableCell>
            <TableCell style={{ width: "20%" }}>
              <h4>Following {user.following}</h4>
            </TableCell>
            <TableCell style={{ width: "20%" }}>
              <h4>Followers {user.followers}</h4>
            </TableCell>
          </TableRow>
          {user.name ? (
            <TableRow>
              <TableCell colSpan={3}>{user.name}</TableCell>
            </TableRow>
          ) : null}
          {user.phone ? (
            <TableRow>
              <TableCell colSpan={3}>{user.phone}</TableCell>
            </TableRow>
          ) : null}
          {user.gender ? (
            <TableRow>
              <TableCell colSpan={3}>{user.gender}</TableCell>
            </TableRow>
          ) : null}
          {user.dateOfBirth ? (
            <TableRow>
              <TableCell colSpan={3}>
                {user.dateOfBirth.substring(0, 10)}
              </TableCell>
            </TableRow>
          ) : null}
          {user.webSite ? (
            <TableRow>
              <TableCell colSpan={3}>{user.webSite}</TableCell>
            </TableRow>
          ) : null}
          {user.biography ? (
            <TableRow>
              <TableCell colSpan={3}>{user.biography}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProfileViewFromat.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileViewFromat;
