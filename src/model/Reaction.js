export class ReactionCreate {
  postId;
  reaction;

  constructor(postId, reaction) {
    this.postId = postId;
    this.reaction = reaction;
  }
}

export class Reaction {
  id;
  reaction;

  constructor(id, reaction) {
    this.id = id;
    this.reaction = reaction;
  }
}
