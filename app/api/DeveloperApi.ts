import axiosClient from "./axiosClient";

const GetDeveloperApi = {
  getDeveloper: () => axiosClient.get("/developers?populate=*"),

  getDeveloperBySlug: (slug: string) =>
    axiosClient.get(
      `/developers?` +
        `filters[slug][$eq]=${slug}` +
        `&populate[0]=logo` +
        `&populate[1]=compounds` +
        `&populate[2]=areas` +
        `&populate[3]=compounds.offer.blocks` +
        `&populate[4]=compounds.offer.compound` +
        `&populate[5]=compounds.offer.developer` + // Add developer relation
        `&populate[6]=compounds.properties`
    ),

  getDevelopersWithNewLaunches: (slug: string) =>
    axiosClient.get(
      `/developers?` +
        `filters[slug][$eq]=${slug}` +
        `&populate[compounds][filters][isNewLaunch][$eq]=true` +
        `&populate[compounds][populate][0]=offer.blocks` +
        `&populate[compounds][populate][1]=properties` +
        `&populate[compounds][populate][2]=developer` +
        `&populate[compounds][populate][3]=banner`
    ),

  // Regular compounds with pagination (excludes trending and new launches)
  getPaginatedCompounds: (
    page: number,
    pageSize: number,
    developerId: number
  ) =>
    axiosClient.get(
      `/compounds?` +
        `filters[developer][id][$eq]=${developerId}` +
        `&filters[isNewLaunch][$eq]=false` + // Exclude new launches
        `&filters[isTrendingProject][$eq]=false` + // Exclude trending projects
        `&pagination[page]=${page}` +
        `&pagination[pageSize]=${pageSize}` +
        `&populate[0]=banner` +
        `&populate[1]=developer.logo` +
        `&populate[2]=offer.blocks` +
        `&populate[3]=offer.compound` +
        `&populate[4]=offer.developer` +
        `&populate[5]=properties` +
        `&populate[6]=area`
    ),

  // New endpoint for trending compounds (no pagination)
  getTrendingCompounds: (developerId: number) =>
    axiosClient.get(
      `/compounds?` +
        `filters[developer][id][$eq]=${developerId}` +
        `&filters[isTrendingProject][$eq]=true` +
        `&populate[0]=banner` +
        `&populate[1]=developer.logo` +
        `&populate[2]=offer.blocks` +
        `&populate[3]=offer.compound` +
        `&populate[4]=offer.developer` +
        `&populate[5]=properties` +
        `&populate[6]=area`
    ),

  // New endpoint for new launch compounds (no pagination)
  getNewLaunchCompounds: (developerId: number) =>
    axiosClient.get(
      `/compounds?` +
        `filters[developer][id][$eq]=${developerId}` +
        `&filters[isNewLaunch][$eq]=true` +
        `&populate[0]=banner` +
        `&populate[1]=developer.logo` +
        `&populate[2]=offer.blocks` +
        `&populate[3]=offer.compound` +
        `&populate[4]=offer.developer` +
        `&populate[5]=properties` +
        `&populate[6]=area`
    ),
};

export default GetDeveloperApi;
