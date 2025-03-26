import axiosClient from "./axiosClient";

const GetHomeApi = {
  getHeroSection: () =>
    axiosClient.get(
      "/home?populate[blocks][on][layout.hero-section][populate]=image"
    ),
  getNewLaunchesSection: () =>
    axiosClient.get(
      `/compounds?filters[isNewLaunch][$eq]=true` +
        `&populate[0]=banner` +
        `&populate[1]=developer.logo` +
        `&populate[2]=offer.blocks` +
        `&populate[3]=offer.compound` +
        `&populate[4]=offer.developer.logo` +
        `&populate[5]=properties` +
        `&populate[6]=area`
    ),

  getPropertyHome: () =>
    axiosClient.get(
      "/properties?filters[isRecommended][$eq]=true" +
        "&populate[0]=banner" +
        "&populate[1]=compound.area" +
        "&populate[2]=compound.developer.logo"
    ),

  getCompoundHome: () =>
    axiosClient.get(
      "/compounds?filters[isRecommended][$eq]=true" +
        "&populate[0]=banner" +
        "&populate[1]=developer.logo" +
        "&populate[2]=area"
    ),

  getAreaHome: () =>
    axiosClient.get("/areas?filters[isRecommended][$eq]=true" + "&populate=*"),
};

export default GetHomeApi;
