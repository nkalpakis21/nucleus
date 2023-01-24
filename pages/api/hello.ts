// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ids: Array<string>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const key = process.env.YOUTUBE_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&q=gucci`;
  const response = await fetch(url);
  const json = await response.json();
  const videos = json.items;
  const ids = videos.map((video: any) => {
    return video.id.videoId;
  })

  res.status(200).json({ ids })
}
