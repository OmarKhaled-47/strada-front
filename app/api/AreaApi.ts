import axiosClient from "./axiosClient";

const GetAreaApi = {
  getArea: () => axiosClient.get("/areas?populate=*"),

  getAreaBySlug: (slug: string) =>
    axiosClient.get(`/areas?filters[slug][$eq]=${slug}&populate=*`),

  getAreaWithCompounds: () =>
    axiosClient.get(
      "/areas?" +
        "populate[compounds][populate][0]=*" +
        "&populate[developers][populate][0]=logo" +
        "&populate[developers][populate][1]=offer.blocks" +
        "&populate[developers][populate][2]=offer.compound" +
        "&populate[developers][populate][3]=offer.developer"
    ),

  getCompoundNumber: () =>
    axiosClient.get("/areas?fields[0]=name&populate[compounds][count]=true"),

  getAreaCard: () =>
    axiosClient.get(
      "/areas?fields[0]=name&fields[1]=description&fields[2]=slug" +
        "&populate[banner][fields][0]=url" +
        "&populate[compounds][count]=true"
    ),

  getNewLaunchesArea: (slug: string) =>
    axiosClient.get(
      `/areas?filters[slug][$eq]=${slug}` +
        "&populate[compounds][filters][isNewLaunch][$eq]=true" +
        "&populate[compounds][populate][0]=*" +
        "&populate[compounds][populate][1]=offer.blocks"
    ),

  getPaginatedCompounds: (page: number, pageSize: number, areaId: number) =>
    axiosClient.get(
      `/compounds?filters[area][id][$eq]=${areaId}` +
        `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
        "&populate[0]=banner" +
        "&populate[1]=developer.logo" +
        "&populate[2]=offer.blocks" +
        "&populate[3]=offer.compound" +
        "&populate[4]=offer.developer.logo" +
        "&populate[5]=properties" +
        "&populate[6]=area"
    ),
};

export default GetAreaApi;
