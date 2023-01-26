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
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAAF4FrclyKI9Ivo3uKRlDKSaoxkAw%3D589SW9xQYVddpkxYiajIcWQDNsDHtRM9sbpndVVCUYDr5bUS2R");
  myHeaders.append("Cookie", "guest_id=v1%3A167469864167089297");
  
  var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  const resp: any = await fetch("https://api.twitter.com/2/users/148873990/mentions?max_results=50&tweet.fields=created_at,conversation_id&expansions=author_id,referenced_tweets.id", requestOptions)
    .then(response => response.json())
    .then((result: any) => {
      return result;
    })
    .catch(error => console.log('error', error));
  
    const mentions = resp.data;
    const authors = resp.includes.users;

    const tweets = mentions.map((mention: any) => {
      const author = authors.find((author: any) => author.id === mention.author_id);
      return {
        tweet_id: mention.id,
        text: mention.text,
        username: author.username,
        name: author.name,
        conversation_id: mention.conversation_id,
      };
    });


    tweets.map(async (tweet: any) => {
      if(tweet.tweet_id && tweet.text) {
    
        const { data: posts, error: checkError } = await supabase
          .from('posts')
          .select("*")
          .eq('tweet_id', tweet.tweet_id);
    
          console.log(tweet.tweet_id, tweet.conversation_id);
        if(posts && posts.length < 1) {
          const { data, error } = await supabase
          .from('posts')
          .insert([
            { created_at: new Date(), 
              conversation_id: tweet.conversation_id,
              is_published: 'true', 
              content: tweet.text, 
              title: tweet.name, 
              youtube_id: 'SvBEVmbEYjI', 
              description: tweet.text, 
              tweet_id: tweet.tweet_id, 
            },
          ]);
          console.log(error);
        }
      }
    })



  res.status(200).json({ tweets: mentions })
}
