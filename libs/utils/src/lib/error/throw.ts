import { APIError, STATUS_CODES } from "./appErr";

export const throwErr = (message: string, statuscode: number) => {
  throw new APIError(
    "API Error",
    statuscode || STATUS_CODES.INTERNAL_ERROR,
    message || "we have a problem",
  );
};
