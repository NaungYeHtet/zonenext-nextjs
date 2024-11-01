import Cookie from "js-cookie";
import { TOKEN_EXPIRATION, TOKEN_NAME } from "../utils/constants";

interface StoreTokenRequest {
  access_token: string;
  refresh_token?: string;
}

export function storeToken(request: StoreTokenRequest) {
  const expiresInMinutes = TOKEN_EXPIRATION;
  const expiresInDays = expiresInMinutes / (24 * 60);
  Cookie.set(TOKEN_NAME, request.access_token, {
    path: "/",
    expires: expiresInDays,
  });
}

export function removeToken() {
  Cookie.remove(TOKEN_NAME);
}
