import axiosClient from "./axiosClient";

const GetAboutApi = {
  getAboutSection: () =>
    axiosClient.get("/about-us?populate[blocks][on][layout.hero-section][populate]=image"),
};

export default GetAboutApi;