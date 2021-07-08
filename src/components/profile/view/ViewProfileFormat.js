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
import { ROLE_REGULAR, ROLE_AGENT } from "../../../model/Role";

function ProfileViewFromat({
  user,
  myProfile,
  role,
  onAddPost,
  onAddCampaign,
  onFollowRequests,
  onFollow,
  onUnfollow,
  onMute,
  onUnmute,
  onReaction,
}) {
  const numSpan = myProfile ? 4 : 3;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            {myProfile ? (
              <>
                <TableCell style={{ width: "15%" }}>
                  <h3>{user.username}</h3>
                </TableCell>
                <TableCell style={{ width: "45%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onAddPost}
                  >
                    Add post
                  </Button>{" "}
                  {role === ROLE_AGENT && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={onAddCampaign}
                      >
                        Add campaign
                      </Button>{" "}
                    </>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onReaction(1)}
                  >
                    Liked
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onReaction(2)}
                  >
                    Disliked
                  </Button>
                  {user.followRequests > 0 ? (
                    <>
                      {" "}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={onFollowRequests}
                      >
                        Follow requests
                      </Button>
                    </>
                  ) : null}
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
          {!myProfile && (role === ROLE_REGULAR || role === ROLE_AGENT) ? (
            user.friend ? (
              <TableRow>
                <TableCell style={{ width: "60%" }} />
                <TableCell style={{ width: "20%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onUnfollow}
                  >
                    Unfollow
                  </Button>
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  {user.muted ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onUnmute}
                    >
                      Unmute
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" onClick={onMute}>
                      Mute
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={2} style={{ width: "80%" }} />
                <TableCell style={{ width: "20%" }}>
                  <Button variant="outlined" color="primary" onClick={onFollow}>
                    Follow
                  </Button>
                </TableCell>
              </TableRow>
            )
          ) : null}
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
  role: PropTypes.string.isRequired,
  onAddPost: PropTypes.func.isRequired,
  onAddCampaign: PropTypes.func.isRequired,
  onFollowRequests: PropTypes.func.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onReaction: PropTypes.func.isRequired,
};

export default ProfileViewFromat;
