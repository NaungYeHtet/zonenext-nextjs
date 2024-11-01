import { isEmpty } from "lodash";
import { NextRequest } from "next/server";
import Cookie from "js-cookie";
import { TOKEN_NAME } from "../utils/constants";

export const isAuthenticated = (request: NextRequest): boolean => {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  return !isEmpty(token);
};
