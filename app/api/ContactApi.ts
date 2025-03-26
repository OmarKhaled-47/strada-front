import axiosClient from "./axiosClient";

const GetContactApi = {
  getContact: () =>
    axiosClient.get(
      "/contact?populate[blocks][on][layout.hero-section][populate]=image"
    ),
};

export default GetContactApi;
