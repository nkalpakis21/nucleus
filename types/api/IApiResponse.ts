export enum ApiErrorType {
  UNKNOWN_ERROR = 'unknown_error',
  NOT_FOUND = 'not_found',
  NOT_AUTHORIZED = 'not_authorized',
  BAD_METHOD = 'bad_method',
  ILLEGAL_STATE = 'illegal_state',
  MISSING_PARAMETERS = 'missing_parameters'
}

export interface IApiError {
  type: ApiErrorType,
  message?: string,
  display_message?: string
}

export interface IApiResponse {
  success: boolean;
  result?: any;
  error?: IApiError;
}

export const DEFAULT_API_ERROR_MSG = 'Sorry, something went wrong!';