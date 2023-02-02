import supabase from '../../utils/supabase';
import MainAppBar from '../../components/app-bar/Main';
import BlogCard from '../../components/blog/blog-card';
import { Grid, Container, Typography } from '@mui/material';
import FooterComponent from '../../components/footer/Footer';
import Link from 'next/link';
import { getCookies, setCookie} from 'cookies-next';
import { TwitterApi } from 'twitter-api-v2';

export async function getServerSideProps(context: any) {
    const {twitterToken, twitterSecret, twitterUserId} = getCookies({ req: context.req, res: context.res });

    
    console.log(process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL);
    console.log(process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID);
    console.log(process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_SECRET);
    if(!twitterToken) {
        const twitterClient = new TwitterApi({ clientId: process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID!, clientSecret: process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_SECRET! });
        const { url, codeVerifier, state } = await twitterClient.generateOAuth2AuthLink(process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL!, { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] });
    
        setCookie('twitterCodeVerifier', codeVerifier, { req: context.req, res: context.res, httpOnly: true });
        setCookie('twitterState', state, { req: context.req, res: context.res, httpOnly: true });        

        return {
            props: {
                twitterAuthLink: url,
            }
        }
    }
    const twitterClient = new TwitterApi(twitterToken);
    const user = await twitterClient.currentUserV2();
    const userTimeline = await twitterClient.v2.userTimeline("148873990");

    return {
        props: {
            posts: userTimeline.data.data,
            user: user.data,
        }
    };
}

export default function BlogListPage({posts, user, twitterAuthLink}: any) {

    if(twitterAuthLink) {
        return (
            <Grid container>
                <Link href={twitterAuthLink}>Sign in with twitter to stream your content</Link>
            </Grid>
        )
    }
    return (
        <>
            <MainAppBar/>
            <Container maxWidth="lg" sx={{mb: 6, minHeight: 'calc(100vh - 200px)'}}>
                <Typography variant="h2">Streams 🤳</Typography>
                <Grid container
                    sx={{mt:5}}
                    spacing={3}
                    >
                        {posts?.map((post: any) => (
                            <Grid item key={post.id}>
                                <BlogCard title={user.usernamme} description={post.text} id={post.id} date={new Date().toDateString()}/>
                            </Grid>
                        ))}
                </Grid>
            </Container>
            <FooterComponent/>
        </>
    )
}