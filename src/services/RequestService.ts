import http from "../http-common";
import ICustomResponse from "../types/CustomResponse";

 const GetAll = () => {
    return http.get<ICustomResponse<any>>("/breeds/list/all");
  };

  const GetBreedVariants = (breed:String) => {
    return http.get<ICustomResponse<string[]>>(`/breed/${breed}/list`);
  };

  const GetBreedVariantImages = (breed:String,variant:String) => {
    return http.get<ICustomResponse<string[]>>(`/breed/${breed}/${variant}/images`);
  };
  const RequestService = {
    GetAll,
    GetBreedVariants,
    GetBreedVariantImages
  };
  export default RequestService;
