export class User {
  username;
  email;
  name;
  phone;
  gender;
  dateOfBirth;
  webSite;
  biography;
  profileIsPrivate;

  constructor(
    username,
    email,
    name,
    phone,
    gender,
    dateOfBirth,
    webSite,
    biography,
    profileIsPrivate
  ) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.webSite = webSite;
    this.biography = biography;
    this.profileIsPrivate = profileIsPrivate;
  }
}

export class UserRequest {
  name;
  phone;
  gender;
  dateOfBirth;
  webSite;
  biography;

  constructor(name, phone, gender, dateOfBirth, webSite, biography) {
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.webSite = webSite;
    this.biography = biography;
  }
}

export class UserDetails {
  username;
  name;
  phone;
  gender;
  dateOfBirth;
  webSite;
  biography;
  following;
  followers;
  canAccess;

  constructor(
    username,
    name,
    phone,
    gender,
    dateOfBirth,
    webSite,
    biography,
    following,
    followers,
    canAccess
  ) {
    this.username = username;
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.webSite = webSite;
    this.biography = biography;
    this.following = following;
    this.followers = followers;
    this.canAccess = canAccess;
  }
}

export const newUser = () => new User("", "", "", "", "", "", "", "", false);
export const newUserRequest = (user) =>
  new UserRequest(
    user.name,
    user.phone,
    user.gender,
    user.dateOfBirth,
    user.webSite,
    user.biography
  );
export const newUserDetails = () =>
  new UserDetails("", "", "", "", "", "", "", 0, 0, false);
