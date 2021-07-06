import React, { useEffect, useState } from "react";
import * as SearchService from "../../services/SearchService";
import PostList from "../post/view/PostList";
import { Pagination } from "@material-ui/lab";

function Home() {
  const [numOfPage, setNumOfPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const sizeOfPage = 21;

  useEffect(() => {
    SearchService.home(numOfPage - 1, sizeOfPage).then((data) => {
      setPosts(data["content"]);
      setTotalPages(data["totalPages"]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPage]);

  const handleChangePage = (event, value) => {
    setNumOfPage(value);
  };

  return (
    <>
      <h2>Home</h2>
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
  );
}

export default Home;
