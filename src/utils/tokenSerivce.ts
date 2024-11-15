// tokenService.js
import queryClient from "../utils/clients/queryClient";
import d from "../constant/constant";

export function getAccessToken(): string {
    return queryClient.getQueryData([d.key.ACCESS_TOKEN_KEY]) as string;
}

export function setAccessToken(token: string) {
    queryClient.setQueryData([d.key.ACCESS_TOKEN_KEY], token);
}
