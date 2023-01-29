// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../utils/supabase';
import twitterClient from '../../../utils/twitter';

type Data = {
  tweets: any
}

interface IBlogCard {
  title: string,
  description: string,
  date: string,
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const body = JSON.parse(req.body)

  console.log('******** ', body.in_reply_to_status_id);

  const status = {status: body.content, in_reply_to_status_id: 1618822630806802435 };
  const resp = await twitterClient.post('statuses/update', status , function(error: any, tweets: any, response: any) {
    if (!error) {
      console.log(tweets);
    }
    console.log(error);
  });

  res.status(200).json({ tweets: {} })
}


// const body = JSON.parse(req.body)
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAA5mAJ4eqvNKgzAup%2FUn5LBXj%2BI68%3Dnqsmy8XgdyHYHKDmjESLBiAdBBswL2JMsaHnUtYoHUWj2mX63F");
//     myHeaders.append("Cookie", "guest_id=v1%3A167469864167089297");
//     myHeaders.append("Authorization", "");
//     // header 'authorization: OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' \

//     //  apiKey: 'tkKvVbWmA3p737AbnszlmzdAO',
//     //  apiSecret: 'p407nJa6vy9NEHSTE1sNmkGfdJOMtSZDqtp2BWG44XS2jtwMyh',
//     //  accessToken: '148873990-FyFHK8NPWfKFnI0BUKOf6TB1eff3YOaMDcTbbbGn',
//     //  accessTokenSecret: 'kTRzJ79afkJQ5AlQygFe67XtMk4SzL5rpnie1jGsL1UV5',

//     // const raw = JSON.stringify({"in_reply_to_status_id": body.in_reply_to_status_id, "status": body.content})
//     var requestOptions: any = {
//     method: 'POST',
//     headers: myHeaders,
//     redirect: 'follow',
//     };

//     const replyStatusId = body.in_reply_to_status_id.toString();
// console.log(replyStatusId);
//     const result: any = await fetch(`https://api.twitter.com/1.1/statuses/update.json?status=hey`, requestOptions)
//         .then(response => response.json())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));