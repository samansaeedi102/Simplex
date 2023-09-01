export const STATUS_CODES = {
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    PAYMER_REQUIREMENT: 402,
    UN_AUTHORISED: 403,
    INVALID_TOKEN: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    UNHANDELD_ERROR: 501,
  };
  
  // export interface IAppError extends Error {
  //   name: string;
  //   statusCode: number;
  //   description?: string;
  //   isOperational?: boolean;
  //   errorStack?: any;
  //   logingErrorResponse?: any;
  //   logError?: any;
  // }
  
  export class AppError extends Error {
    name: string;
    statusCode?: number;
    description?: string;
    isOperational?: boolean;
    errorStack?: any;
    logingErrorResponse?: any;
    logError?: any;
  
    constructor(
      name: string,
      statusCode: number,
      description: string,
      isOperational: boolean,
      errorStack?: any,
      logingErrorResponse?: any,
    ) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.description = description;
      this.statusCode = statusCode || STATUS_CODES.INTERNAL_ERROR;
      this.isOperational = isOperational;
      this.errorStack = errorStack;
      this.logError = logingErrorResponse;
      Error.captureStackTrace(this);
    }
  }
  
  // api Specific Errors
  export class APIError extends AppError {
    constructor(
      name: string,
      statusCode: number,
      description: string,
      isOperational: boolean = true,
    ) {
      console.log("API-ERROR:", name, statusCode, description, isOperational);
      super(name, statusCode, description, isOperational);
    }
  }
  
  // 400
  export class BadRequestError extends AppError {
    constructor(description = "Bad request", logingErrorResponse: any) {
      super(
        "NOT FOUND",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        false,
        logingErrorResponse,
      );
    }
  }
  
  // 400
  export class ValidationError extends AppError {
    constructor(description = "Validation Error", errorStack: any) {
      super(
        "BAD REQUEST",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        errorStack,
      );
    }
  }
  