import axiosClient from "./axiosClient";

const GetPropertyApi = {
  getProperty: () => axiosClient.get("/properties?populate=*"),

  getPropertyBySlug: (slug: string) =>
    axiosClient.get(
      `/properties?filters[slug][$eq]=${slug}` +
        `&populate[0]=banner` +
        `&populate[1]=imageGallery` +
        `&populate[2]=floorPlanImage` +
        `&populate[3]=masterPlanImage` +
        `&populate[4]=compound.area` +
        `&populate[5]=compound.developer.logo`
    ),

  getPropertiesByArea: (slug: string) =>
    axiosClient.get(
      `/properties?filters[compound][area][slug][$eq]=${slug}` +
        `&populate[0]=banner` +
        "&populate[1]=compound.area"
    ),

  getAllProperties: () =>
    axiosClient.get(
      `/properties?` +
        `&populate[0]=banner` +
        `&populate[1]=compound.area` +
        `&populate[2]=compound.developer.logo`
    ),
};

export default GetPropertyApi;
