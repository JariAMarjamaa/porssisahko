export class ApiError extends Error {
    constructor(msg, ...params) {
      super(...params)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError)
      }
  
      this.name = "ApiError";
      this.message = msg;
      console.error("ApiError. this:", this);
    }
  }

export const processResponse = (response, okCodes, errorMessage, callback) => {
  console.error("processResponse. response:", response);

  if (response && response.status) {
    if (okCodes.indexOf(response.status) < 0) {
      if (callback) callback(response);

      throw new ApiError(response.status, errorMessage, response);
    }
  }
  else {
    console.error("Error reading response status got response object:", response);
    throw Error("Error reading response status", response);
  }

}