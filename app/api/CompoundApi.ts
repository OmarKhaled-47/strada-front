// export default GetCompoundApi;

import axiosClient from "./axiosClient";

const GetCompoundApi = {
  getCompoundApi: (slug: string) =>
    axiosClient.get(`/compounds?filters[slug][$eq]=${slug}&populate=*`),

  getCompoundWithProperty: (slug: string) =>
    axiosClient.get(
      `/compounds?filters[slug][$eq]=${slug}&populate[properties][populate]=*`
    ),

  getCompoundWithDeveloper: (slug: string) =>
    axiosClient.get(
      `/compounds?filters[slug][$eq]=${slug}&populate[developer][populate]=*`
    ),

  getCompoundWithOffer: (slug: string) =>
    axiosClient.get(
      `/compounds?filters[slug][$eq]=${slug}` +
        `&populate[offer][populate][blocks]=*`
    ),
};

export default GetCompoundApi;
