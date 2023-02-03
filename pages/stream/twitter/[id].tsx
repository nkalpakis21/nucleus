import MainAppBar from "../../../components/app-bar/Main";
import { Box, Container, Grid, IconButton, Input, InputLabel, LinearProgress, Typography } from "@mui/material";
import CommentComponent from "../../../components/blog/comment";
import AddIcon from '@mui/icons-material/Add';
import { getCookies} from 'cookies-next';
import { TwitterApi } from "twitter-api-v2";
import { useRouter } from "next/router";
import { useEffect } from "react";


export async function getServerSideProps ({params, req, res}: any) {
    const {twitterToken} = getCookies({ req, res });
    
    if(!twitterToken) {
        return {
            props: {
                redirectUrl: '/stream'
            }
        }
    }
    
    try {
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
    } catch (e) {
        console.error(e);
        return {
            props: {
                redirectUrl: '/stream'
            }
        }
    }

}
export default function BlogPostPage({post, comments, redirectUrl}: any) {
    const router = useRouter();

    const addComment = async(e: any) => {
        e.preventDefault();
        await fetch('/api/twitter/post', {
            method: 'POST',
            body: JSON.stringify({"content": e.target.comment.value.toString(), "in_reply_to_status_id": post.data.id.toString()})
        })
    }

    useEffect(() => {
        if(redirectUrl) {
            router.push(redirectUrl);
        }
    }, [redirectUrl])

    if(!redirectUrl) {
        
    }

    return (
        <>
            <MainAppBar/>
            <Container maxWidth="md">
                <Grid container sx={{mb: 2}}>
                    {post !== undefined ? (
                        <Grid item xs={6}>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography variant="body1">{post.content}</Typography>
                        </Grid>
                    ):(
                        <Box sx={{ width: '30%' }}>
                            <LinearProgress />
                        </Box>
                    )}
                </Grid>
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
                                disabled={!post}
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
                    {comments && comments.length > 0 ? (comments?.map((comment: any) => (
                    <Grid item key={comment.tweet_id}>
                        <CommentComponent text={comment.text} author={comment.username} date={new Date(comment.created_at).toDateString()}/>
                    </Grid>
                    ))) : (<Typography variant="h6" sx={{mt: 4}}>No comments yet!</Typography>)}
                </Grid>
            </Container>
        </>
    )
}