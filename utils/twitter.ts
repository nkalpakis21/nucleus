// import { TwitterClient } from 'twitter-api-client';

// bearer token = AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAA5mAJ4eqvNKgzAup%2FUn5LBXj%2BI68%3Dnqsmy8XgdyHYHKDmjESLBiAdBBswL2JMsaHnUtYoHUWj2mX63F
// const twitterClient = new TwitterClient({
//   apiKey: 'tkKvVbWmA3p737AbnszlmzdAO',
//   apiSecret: 'p407nJa6vy9NEHSTE1sNmkGfdJOMtSZDqtp2BWG44XS2jtwMyh',
//   accessToken: '148873990-FyFHK8NPWfKFnI0BUKOf6TB1eff3YOaMDcTbbbGn',
//   accessTokenSecret: 'kTRzJ79afkJQ5AlQygFe67XtMk4SzL5rpnie1jGsL1UV5',
// });

var Twitter = require('twitter');
 const client_id = "aXl1MDZfS0VUakp3ZExBRjhkV2k6MTpjaQ";
 const client_sectret = "J15wKp96OxGTy4jJU5CAMRdFXqb0E7JTUEad3DPZ6c6heWYdtB";
 const bearer_token = " AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAA5mAJ4eqvNKgzAup%2FUn5LBXj%2BI68%3Dnqsmy8XgdyHYHKDmjESLBiAdBBswL2JMsaHnUtYoHUWj2mX63F";
var twitterClient = new Twitter({
  consumer_key: 'tkKvVbWmA3p737AbnszlmzdAO',
  consumer_secret: 'p407nJa6vy9NEHSTE1sNmkGfdJOMtSZDqtp2BWG44XS2jtwMyh',
  access_token_key: '148873990-uf93rgMG64xutpPdFuJJg6yiPTgc8cN1mq6iGr7k',
  access_token_secret: 'mRA9mXDuQPo7wDqerOcPcakeaolBoeWvrPC2pIqclOwDS'
});
 
export default twitterClient;