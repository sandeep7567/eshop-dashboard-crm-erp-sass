import { HOUR } from "@/constant/generalConstant";

export const expirationTime = (dateExpiration: string) => {
  const expirationTime = new Date(dateExpiration).getTime() + HOUR;

  return expirationTime; // dateExpiration + 1 Hour;
};
