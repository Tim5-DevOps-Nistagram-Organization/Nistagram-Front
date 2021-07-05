import React, { useEffect, useState } from "react";
import * as UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import FollowRequestsForm from "./FollowRequestsForm";
import { useHistory } from "react-router-dom";

function FollowRequests() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    UserService.followRequests()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleView(username) {
    history.push("/profile/view/" + username);
  }

  function handleDecision(username, accept) {
    UserService.followRequestsDecision(username, accept)
      .then((message) => {
        toast.success(message);
        history.push("/profile/view");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <FollowRequestsForm
      users={users}
      onView={handleView}
      onDecision={handleDecision}
    />
  );
}

export default FollowRequests;
