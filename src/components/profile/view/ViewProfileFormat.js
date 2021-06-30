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

function ProfileViewFromat({ user, myProfile, onAddPost }) {
  const numSpan = myProfile ? 4 : 3;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            {myProfile ? (
              <>
                <TableCell style={{ width: "40%" }}>
                  <h3>{user.username}</h3>
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onAddPost}
                  >
                    Add post
                  </Button>
                </TableCell>
              </>
            ) : (
              <TableCell style={{ width: "60%" }}>
                <h3>{user.username}</h3>
              </TableCell>
            )}
            <TableCell style={{ width: "20%" }}>
              <h4>Following {user.following}</h4>
            </TableCell>
            <TableCell style={{ width: "20%" }}>
              <h4>Followers {user.followers}</h4>
            </TableCell>
          </TableRow>
          {user.name ? (
            <TableRow>
              <TableCell colSpan={numSpan}>{user.name}</TableCell>
            </TableRow>
          ) : null}
          {user.phone ? (
            <TableRow>
              <TableCell colSpan={numSpan}>{user.phone}</TableCell>
            </TableRow>
          ) : null}
          {user.gender ? (
            <TableRow>
              <TableCell colSpan={numSpan}>{user.gender}</TableCell>
            </TableRow>
          ) : null}
          {user.dateOfBirth ? (
            <TableRow>
              <TableCell colSpan={numSpan}>
                {user.dateOfBirth.substring(0, 10)}
              </TableCell>
            </TableRow>
          ) : null}
          {user.webSite ? (
            <TableRow>
              <TableCell colSpan={numSpan}>{user.webSite}</TableCell>
            </TableRow>
          ) : null}
          {user.biography ? (
            <TableRow>
              <TableCell colSpan={numSpan}>{user.biography}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProfileViewFromat.propTypes = {
  user: PropTypes.object.isRequired,
  myProfile: PropTypes.bool.isRequired,
  onAddPost: PropTypes.func.isRequired,
};

export default ProfileViewFromat;
