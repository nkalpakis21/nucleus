import { NextApiRequest, NextApiResponse } from "next";
const { TwitterApi } = require('twitter-api-v2');
import { setCookie, getCookies} from 'cookies-next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { state, code } = req.query;

    const {twitterCodeVerifier, twitterState} = getCookies({ req, res });

    if (!state || !code || !twitterCodeVerifier || !twitterState) {
        res.status(500).json({error: 'You denied the app or your session expired!'});
    }

    if (state !== twitterState) {
        res.status(500).json({error: 'Stored tokens didnt match!'});
    }
    const client = new TwitterApi({ clientId: 'aXl1MDZfS0VUakp3ZExBRjhkV2k6MTpjaQ', clientSecret: 'nlDr03OLCXuJFfoXQtcUBgz8f3ud9ccmXPBBX_sbxWXogE0uDg'});
    const { accessToken, accessSecret, screenName, userId } = await client.loginWithOAuth2({ code, codeVerifier: twitterCodeVerifier, redirectUri: 'http://localhost:3000/api/twitter/auth/callback' });

    setCookie('twitterUserId', userId, { req, res, httpOnly: true });
    setCookie('twitterUsername', screenName, { req, res, httpOnly: true });
    setCookie('twitterToken', accessToken, { req, res, httpOnly: true });
    setCookie('twitterSecret', accessSecret, { req, res, httpOnly: true });
    
    res.redirect(307, '/');
    return;
}