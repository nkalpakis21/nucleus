import { NextApiRequest, NextApiResponse } from "next";
const { TwitterApi } = require('twitter-api-v2');
import { setCookie, getCookies} from 'cookies-next';
import { apiError } from "../../../../utils/api/apiError";
import { ApiErrorType } from "../../../../types/api/IApiResponse";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { state, code } = req.query;

    const {twitterCodeVerifier, twitterState} = getCookies({ req, res });

    if (!state || !code || !twitterCodeVerifier || !twitterState) {
        apiError(res, ApiErrorType.MISSING_PARAMETERS, 'You denied the app or your session expired!')
        return;
    }

    if (state !== twitterState) {
        apiError(res, ApiErrorType.ILLEGAL_STATE, 'Stored tokens didnt match!')
        return;
    }
    const client = new TwitterApi({ clientId: process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID!, clientSecret: process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_SECRET!});
    const { accessToken, accessSecret, screenName, userId } = await client.loginWithOAuth2({ code, codeVerifier: twitterCodeVerifier, redirectUri: process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL! });

    setCookie('twitterUserId', userId, { req, res, httpOnly: true });
    setCookie('twitterUsername', screenName, { req, res, httpOnly: true });
    setCookie('twitterToken', accessToken, { req, res, httpOnly: true });
    setCookie('twitterSecret', accessSecret, { req, res, httpOnly: true });
    
    res.redirect(307, '/');
    return;
}