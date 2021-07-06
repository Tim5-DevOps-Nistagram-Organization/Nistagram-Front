export class Post {
  mediaId;
  description;
  tags;

  constructor(mediaId, description, tags) {
    this.mediaId = mediaId;
    this.description = description;
    this.tags = tags;
  }
}

export class PostDetails {
  mediaId;
  username;
  description;

  constructor(mediaId, username, description) {
    this.mediaId = mediaId;
    this.username = username;
    this.description = description;
  }
}

export const newPost = () => new Post(null, "", []);
export const newPostDetails = () => new PostDetails(null, "", "");
