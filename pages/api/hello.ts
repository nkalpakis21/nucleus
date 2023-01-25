// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../utils/supabase';
import twitterClient from '../../utils/twitter'

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

  const tweets = await twitterClient.tweets.statusesMentionsTimeline();
  const tweetToAdd = {
    id: tweets?.[0]?.id,
    text: tweets?.[0]?.text,
  }
  if(tweetToAdd.id && tweetToAdd.text) {

    const { data: posts, error: checkError } = await supabase
      .from('posts')
      .select("*")
      .eq('tweet_id', tweetToAdd.id);

    if(posts && posts.length < 1) {
      const { data, error } = await supabase
      .from('posts')
      .insert([
        { created_at: new Date(), is_published: 'true', content: tweetToAdd.text, title: 'random title', youtube_id: 'SvBEVmbEYjI', description: 'my cool description', tweet_id: tweetToAdd.id},
      ])
    }
  }


  res.status(200).json({ tweets })
}
