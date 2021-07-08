import React, { useEffect, useState } from "react";
import * as PostService from "../../../services/PostService";
import { toast } from "react-toastify";
import ReportsForm from "./ReportsForm";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    PostService.reports()
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fileterReports(id) {
    setReports((prevValue) =>
      // Filter out the item with the matching index
      prevValue.filter((value) => value.id !== id)
    );
  }

  function handleDecision(id, accept) {
    console.log(id, accept);
    if (accept) {
      PostService.reportAccept(id)
        .then((message) => {
          toast.success(message);
          fileterReports(id);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      PostService.reportReject(id)
        .then((message) => {
          toast.success(message);
          fileterReports(id);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  return (
    <>
      <h2>Unappropriated content reports</h2>
      {reports.length > 0 ? (
        <ReportsForm reports={reports} onDecision={handleDecision} />
      ) : (
        <h3>Nothing to show</h3>
      )}
    </>
  );
}

export default Reports;
