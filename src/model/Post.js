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

export const newPost = () => new Post(null, "", []);
