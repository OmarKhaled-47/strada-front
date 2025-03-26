// import axiosClient from "./axiosClient";

// const GetNewLaunchesApi = {
//   getNewLaunches: () =>
//     axiosClient.get("/new-launch?populate[blocks][populate]=*"),

//   getNewLaunchesSection: () =>
//     axiosClient.get("/compounds?populate=*&filters[isNewLaunch][$eq]=true"),

//   getTrendingProject: () =>
//     axiosClient.get(
//       "/compounds?populate=*&filters[isTrendingProject][$eq]=true"
//     ),
// };

// export default GetNewLaunchesApi;

import axiosClient from "./axiosClient";

const GetNewLaunchesApi = {
  getNewLaunches: () =>
    axiosClient.get("/new-launch?populate[blocks][populate]=*"),

  getNewLaunchesSection: () =>
    axiosClient.get(
      "/compounds?filters[isNewLaunch][$eq]=true&populate[0]=banner&populate[1]=developer.logo&populate[2]=offer.blocks&populate[3]=offer.compound&populate[4]=offer.developer&populate[5]=properties&populate[6]=area"
    ),

  getTrendingProject: () =>
    axiosClient.get(
      "/compounds?filters[isTrendingProject][$eq]=true&populate[0]=banner&populate[1]=developer.logo&populate[2]=offer.blocks&populate[3]=offer.compound&populate[4]=offer.developer&populate[5]=properties&populate[6]=area"
    ),
};

export default GetNewLaunchesApi;
