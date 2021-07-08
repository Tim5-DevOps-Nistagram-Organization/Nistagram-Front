import React, { useEffect, useState } from "react";
import SearchTabs from "./SearchTabs";
import SearchUsers from "./SearchUsers";
import * as SearchService from "../../services/SearchService";
import { Pagination } from "@material-ui/lab";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostList from "../post/view/PostList";

function Search({ username }) {
  const [tab, setTab] = useState(0);
  const [text, setText] = useState("");
  const [numOfPage, setNumOfPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const sizeOfPage = 21;
  const history = useHistory();

  useEffect(() => {
    if (tab === 0) {
      SearchService.searchUsers(text, numOfPage - 1, sizeOfPage).then(
        (data) => {
          setUsers(data["content"]);
          setTotalPages(data["totalPages"]);
        }
      );
    } else {
      SearchService.searchPosts(text, numOfPage - 1, sizeOfPage).then(
        (data) => {
          setPosts(data["content"]);
          setTotalPages(data["totalPages"]);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, text, numOfPage]);

  function handleChangeTab(event, newValue) {
    setTab(newValue);
    setNumOfPage(1);
    setText("");
  }

  function handleChangeText(event) {
    const { value } = event.target;
    setText(value);
    setNumOfPage(1);
  }

  const handleChangePage = (event, value) => {
    setNumOfPage(value);
  };

  function handleView(userUsername) {
    if (userUsername === username) history.push("/profile/view");
    else history.push("/profile/view/" + userUsername);
  }

  return (
    <>
      <h2>Search</h2>
      <SearchTabs onChange={handleChangeTab} value={tab} />
      <SearchForm onChange={handleChangeText} text={text} />
      {tab === 0 && <SearchUsers users={users} onView={handleView} />}
      {tab === 1 && <PostList posts={posts} />}
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
  );
}

Search.propTypes = {
  username: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
