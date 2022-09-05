export const BaseUrl =
  process.env.REACT_APP_ENV === "production"
    ? "https://nso3fpbvh1.execute-api.ap-south-1.amazonaws.com/Prod/api/"
    : "https://nso3fpbvh1.execute-api.ap-south-1.amazonaws.com/Prod/api/";

export const auth = {
  login: "Authorization",
};

export const endpoints = {
  client: "Client",
  user: "User",
};
