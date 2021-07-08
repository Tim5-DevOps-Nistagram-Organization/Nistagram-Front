import React, { useEffect, useState } from "react";
import * as SearchService from "../../services/SearchService";
import PostList from "./view/PostList";
import { Pagination } from "@material-ui/lab";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { UNLOGGED } from "../../model/Role";
import AddsList from "../adds/AddsList";

function ShowPosts({ option, role }) {
  const [numOfPage, setNumOfPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [adds, setAdds] = useState([]);
  const sizeOfPage = 21;

  useEffect(() => {
    if (numOfPage === 1) {
      loadPosts();
    } else {
      setNumOfPage(1);
    }
    if (!option && role !== UNLOGGED) {
      loadAdds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPage]);

  function loadPosts() {
    if (option === "1" || option === "2") {
      SearchService.searchReactions(option, numOfPage - 1, sizeOfPage).then(
        (data) => {
          setPosts(data["content"]);
          setTotalPages(data["totalPages"]);
        }
      );
    } else {
      SearchService.home(numOfPage - 1, sizeOfPage).then((data) => {
        setPosts(data["content"]);
        setTotalPages(data["totalPages"]);
      });
    }
  }

  function loadAdds() {
    let num = localStorage.getItem("num");
    let date = localStorage.getItem("date");
    num = num === null || num === undefined ? 0 : parseInt(num);
    date = date === null || date === undefined ? new Date() : new Date(date);
    const today = new Date();
    if (
      today.getFullYear() !== date.getFullYear() ||
      today.getMonth() !== date.getMonth() ||
      today.getDate() !== date.getDate()
    ) {
      num = 0;
      date = today;
    }
    SearchService.adds(num).then((data) => {
      setAdds(data);
      localStorage.setItem("num", num + 1);
      localStorage.setItem("date", date);
    });
  }

  const handleChangePage = (event, value) => {
    setNumOfPage(value);
  };

  return (
    <>
      <h2>{option === "1" ? "Like" : option === "2" ? "Dislike" : "Home"} </h2>
      {posts.length > 0 ? (
        <>
          <PostList posts={posts} />
          {totalPages > 0 && (
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Pagination
                count={totalPages}
                page={numOfPage}
                onChange={handleChangePage}
              />
            </div>
          )}
        </>
      ) : (
        <h3>Nothing to show</h3>
      )}
      {!option && role !== UNLOGGED && <AddsList adds={adds} />}
    </>
  );
}

ShowPosts.propTypes = {
  option: PropTypes.string,
  role: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const option = ownProps.match.params.option;
  return {
    option,
    role: state.userRole,
  };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
