import { NextApiResponse } from "next";
import { ApiErrorType, DEFAULT_API_ERROR_MSG, IApiError } from "../../types/api/IApiResponse";

const ERROR_CODE = 400;

export function apiError(resp: NextApiResponse, type: ApiErrorType, message: string = DEFAULT_API_ERROR_MSG) {
    const response: IApiError = {
        type,
        message,
        display_message: message
    };

    return resp.status(ERROR_CODE).json(response);
}

export function apiErrorNotAuthorized(res: NextApiResponse, message?: string) {
    const response = {
        type: ApiErrorType.NOT_AUTHORIZED,
        message,
    }
    return res.status(ERROR_CODE).json(response);
}