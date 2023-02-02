import { NextApiResponse } from 'next';

const SUCCESS_CODE = 200;

export function apiResponse<T>(res: NextApiResponse, data?: T) {
  if (!data) {
    return res.status(SUCCESS_CODE).json({ result: {} });
  }
  return res.status(SUCCESS_CODE).json(data);
}