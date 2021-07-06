import React, { useEffect, useState } from "react";
import * as AuthService from "../../../services/AuthService";
import { toast } from "react-toastify";
import RegistrationRequestsForm from "./RegistrationRequestsForm";

function RegistrationRequests() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    AuthService.registrationRequests()
      .then((data) => {
        setAgents(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fileterAgents(id) {
    setAgents((prevValue) =>
      // Filter out the item with the matching index
      prevValue.filter((value) => value.id !== id)
    );
  }

  function handleDecision(id, accept) {
    if (accept) {
      AuthService.registrationRequestsAccept(id)
        .then((message) => {
          toast.success(message);
          fileterAgents(id);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      AuthService.registrationRequestsReject(id)
        .then((message) => {
          toast.success(message);
          fileterAgents(id);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  return (
    <>
      <h2>Registration requests</h2>
      {agents.length > 0 ? (
        <RegistrationRequestsForm agents={agents} onDecision={handleDecision} />
      ) : (
        <h3>Nothing to show</h3>
      )}
    </>
  );
}

export default RegistrationRequests;
