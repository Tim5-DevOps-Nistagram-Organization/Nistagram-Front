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
  id;
  mediaId;
  username;
  description;
  reaction;

  constructor(id, mediaId, username, description, reaction) {
    this.id = id;
    this.mediaId = mediaId;
    this.username = username;
    this.description = description;
    this.reaction = reaction;
  }
}

export const newPost = () => new Post(null, "", []);
export const newPostDetails = () => new PostDetails(null, null, "", "", null);
