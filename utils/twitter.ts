import { TwitterClient } from 'twitter-api-client';

// bearer token = AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAAF4FrclyKI9Ivo3uKRlDKSaoxkAw%3D589SW9xQYVddpkxYiajIcWQDNsDHtRM9sbpndVVCUYDr5bUS2R
const twitterClient = new TwitterClient({
  apiKey: 'tkKvVbWmA3p737AbnszlmzdAO',
  apiSecret: 'p407nJa6vy9NEHSTE1sNmkGfdJOMtSZDqtp2BWG44XS2jtwMyh',
  accessToken: '148873990-FyFHK8NPWfKFnI0BUKOf6TB1eff3YOaMDcTbbbGn',
  accessTokenSecret: 'kTRzJ79afkJQ5AlQygFe67XtMk4SzL5rpnie1jGsL1UV5',
});

export default twitterClient;