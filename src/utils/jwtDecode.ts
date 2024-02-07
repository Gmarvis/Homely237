import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  const userData: any = jwtDecode(token);
  return userData.user.dataValues;
};
