import supabase from "../../../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../../components/app-bar/Main";
import { Box, Container, Grid, IconButton, Input, InputLabel, TextField, Typography } from "@mui/material";
import CommentComponent from "../../../components/blog/comment";
import AddIcon from '@mui/icons-material/Add';
import { getCookies, setCookie} from 'cookies-next';
import { TwitterApi } from "twitter-api-v2";


export async function getServerSideProps ({params, req, res}: any) {
    const {twitterToken, twitterSecret, twitterUserId} = getCookies({ req, res });
    
    if(!twitterToken) {
        const client = new TwitterApi({ appKey: '3ljRwHvLYQ86vcYadLmBjarwh', appSecret: 'HkMF1D2fHFnsHqx7kpFXi8Z9OdKmcWJf8m5Om6cRTw0ZPOq30o', accessToken: twitterToken, accessSecret: twitterSecret });
        const authLink = await client.generateAuthLink('http://localhost:3000/api/twitter/auth/callback');    
        setCookie('twitterToken', authLink.oauth_token, { req, res, httpOnly: true });
        setCookie('twitterSecret', authLink.oauth_token_secret, { req, res, httpOnly: true });
        return {
            props: {
                twitterAuthLink: authLink.url,
            }
        }
    }
    
    const twitterClient = new TwitterApi(twitterToken);
    const tweet = await twitterClient.v2.singleTweet(params.id, {
    expansions: [
        'entities.mentions.username',
        'in_reply_to_user_id',
    ],
    "tweet.fields": "conversation_id"
    });


    
    const comments = await twitterClient.v2.search(`conversation_id: ${tweet.data.conversation_id}`, {
        "tweet.fields" : ["created_at"]
    });

    return {
        props: {
            post: tweet,
            comments: comments.data.data || []

        }
    }
}
export default function BlogPostPage({post, comments}: any) {
    const opts = {
        width: '50%',
        playerVars: {
          autoplay: 1,
        },
      };

    const onReady = (event: any) => {
        // event.target.pauseVideo();
    }

    const addComment = async(e: any) => {
        e.preventDefault();
        console.log(post.data.id);

        const response = await fetch('/api/twitter/post', {
            method: 'POST',
            body: JSON.stringify({"content": e.target.comment.value.toString(), "in_reply_to_status_id": post.data.id})
        })
    }


    return (
        <>
            <MainAppBar/>
            <Container maxWidth="md">
                <Grid container sx={{mb: 2}}>
                    <Grid item xs={6}>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body1">{post.content}</Typography>
                    </Grid>
                </Grid>
                <YouTube videoId={post.youtube_id} opts={opts} onReady={onReady} />
                <Grid container sx={{mt: 4}}>
                    <form onSubmit={addComment}>
                        <Grid container alignItems="end">
                            <Box sx={{mr:1.5}}>
                                <InputLabel htmlFor="my-input">Add a comment...</InputLabel>
                                <Input id="add-comment" name="comment" aria-describedby="add-comment" />
                            </Box>
                            <IconButton 
                                type="submit"
                                aria-lable="add-comment" 
                                sx={{height: 20, width: 20, color: 'black', '&:hover': {
                                    backgroundColor: 'rgba(172, 225, 246, 0.16)',
                                    borderRadius: 1
                                }}}>
                                <AddIcon/>
                            </IconButton>
                        </Grid>
                    </form>
                </Grid>
                <Grid container rowSpacing={3} mt={0.5}>
                    {comments && (comments?.map((comment: any) => (
                    <Grid item key={comment.tweet_id}>
                        <CommentComponent text={comment.text} author={comment.username} date={new Date(comment.created_at).toDateString()}/>
                    </Grid>
                    )))}
                </Grid>
            </Container>
        </>
    )
}