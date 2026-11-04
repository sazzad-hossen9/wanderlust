import { headers } from "next/headers";
import { authClient } from "./auth-client";
import { auth } from "./auth";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  const token = data?.token;
  return token;
};

export const getTokenFromServer = async () => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken.token;
  return token;
};
