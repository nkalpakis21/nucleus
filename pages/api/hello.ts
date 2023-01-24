// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../utils/supabase';
import twitterClient from '../../utils/twitter'

type Data = {
  tweets: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const tweets = await twitterClient.tweets.statusesMentionsTimeline();
  const tweetToAdd = tweets?.[0]?.text;
  if(tweetToAdd) {
    const { data, error } = await supabase
    .from('posts')
    .insert([
      { created_at: new Date(), is_published: 'true', content: tweets?.[0].text, title: 'random title', youtube_id: 'SvBEVmbEYjI', description: 'my cool description'  },
    ])
    console.log(data);
  }


  res.status(200).json({ tweets })
}
