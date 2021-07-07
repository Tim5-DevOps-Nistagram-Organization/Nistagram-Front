export class Campaign {
  advertisements;
  startDate;
  endDate;
  numShowsPerDay;

  constructor(advertisements, startDate, endDate, numShowsPerDay) {
    this.advertisements = advertisements;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numShowsPerDay = numShowsPerDay;
  }
}

export class Advetisment {
  websiteUrl;
  mediaId;

  constructor(websiteUrl, mediaId) {
    this.websiteUrl = websiteUrl;
    this.mediaId = mediaId;
  }
}

export const newCampaign = () =>
  new Campaign([new Advetisment("", null)], "", "", 0);
