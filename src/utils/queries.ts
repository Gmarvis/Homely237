import { SERVER_URL } from "./constant";
import ApiCall from "./httpClient";

const apiCall = new ApiCall();

type SigUpType = {
  name: string;
  email: string;
  password: string;
};

export const SIGNUP = (newUser: SigUpType) => {
  return apiCall.POST(SERVER_URL + "/users/signup", newUser);
};

type LoginType = {
  email: string;
  password: string;
};

export const LOGIN = (returningUser: LoginType) => {
  // console.log(returningUser);
  return apiCall.POST(SERVER_URL + "/users/login", returningUser);
};
