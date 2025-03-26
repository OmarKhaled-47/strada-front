import axiosClient from "./axiosClient";

const GetOfferApi = {
  getOfferApi: (slug: string) =>
    axiosClient.get(
      `/api/offers?filters[compound][slug][$eq]=${slug}&populate[developer][populate]=*&populate[compound][populate]=*`
    ),

  getOfferBySlug: (slug: string) =>
    axiosClient.get(`/offers?filters[compound][slug][$eq]=${slug}&populate=*`),
};

export default GetOfferApi;
