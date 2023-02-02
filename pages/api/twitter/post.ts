// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../utils/supabase';
import { setCookie, getCookies} from 'cookies-next';
import { TwitterApi } from 'twitter-api-v2';


interface IBlogCard {
  title: string,
  description: string,
  date: string,
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const {twitterToken} = getCookies({ req, res });

  if (!twitterToken) {
    res.status(500).json({error: 'User is not twitter authenticated'});
    return;
  }

  try{ 
    const body = JSON.parse(req.body)
    const status = {status: body.content, in_reply_to_status_id: body.in_reply_to_status_id };
    const twitterClient = new TwitterApi(twitterToken);
    const resp = await twitterClient.v2.reply(status.status, status.in_reply_to_status_id);
    console.log(resp)
    res.status(200).json({ success: true })
    return;
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong' })  
    return;
  }
}