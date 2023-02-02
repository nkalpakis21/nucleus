// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookies} from 'cookies-next';
import { TwitterApi } from 'twitter-api-v2';
import { apiError } from '../../../utils/api/apiError';
import { ApiErrorType } from '../../../types/api/IApiResponse';
import { apiResponse } from '../../../utils/api/apiResponse';
import { IPostTweetResponse } from '../../../types/api/twitter/IPostTweetResponse';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const {twitterToken} = getCookies({ req, res });

  if (!twitterToken) {
    apiError(res,ApiErrorType.NOT_AUTHORIZED, 'User is not twitter authenticated');
    return;
  }

  try{ 
    const body = JSON.parse(req.body)
    const status = {status: body.content, in_reply_to_status_id: body.in_reply_to_status_id };
    const twitterClient = new TwitterApi(twitterToken);
    await twitterClient.v2.reply(status.status, status.in_reply_to_status_id);
    apiResponse<IPostTweetResponse>(res,{ success: true })
    return;
  } catch (e) {
    apiError(res,ApiErrorType.UNKNOWN_ERROR);
    return;
  }
}