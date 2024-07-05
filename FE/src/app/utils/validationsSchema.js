import * as Yup from "yup";

export const movieUploadInitialValues = {
  movieName: "",
  description: "",
  imageUrl: "",
};

export const MovieUploadSchema = Yup.object({
  movieName: Yup.string().required("Movie name is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Invalid URL format")
    .matches(/^https?:\/\//, "URL must start with http:// or https://")
    .required("Image URL is required"),
});
