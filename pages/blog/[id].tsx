import supabase from "../../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../components/app-bar/Main";
import { Box, Container, Grid, IconButton, Input, InputLabel, TextField, Typography } from "@mui/material";
import CommentComponent from "../../components/blog/comment";
import AddIcon from '@mui/icons-material/Add';

export async function getServerSideProps ({params}: any) {
    const {data: post, error} = await supabase.from('posts').select('*, comments(*)').eq('id', params.id).single();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAA5mAJ4eqvNKgzAup%2FUn5LBXj%2BI68%3Dnqsmy8XgdyHYHKDmjESLBiAdBBswL2JMsaHnUtYoHUWj2mX63F");
    myHeaders.append("Cookie", "guest_id=v1%3A167469864167089297");

    var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const result: any = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${post.conversation_id}&tweet.fields=in_reply_to_user_id,author_id,created_at&expansions=author_id`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));


    const comments = result.data;
    const authors = result?.includes?.users;

    const tweets = comments?.map((mention: any) => {
        const author = authors.find((author: any) => author.id === mention.author_id);
        return {
          tweet_id: mention.id,
          text: mention.text,
          username: `@${author.username}`,
          name: author.name,
          date: mention.created_at
        };
    });

    return {
        props: {
            post,
            comments: tweets || []

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
        console.log('1618822630806802435');
        console.log(post.tweet_id);

        const response = await fetch('/api/twitter/post', {
            method: 'POST',
            body: JSON.stringify({"content": e.target.comment.value.toString(), "in_reply_to_status_id": post.conversation_id})
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
                        <CommentComponent text={comment.text} author={comment.username} date={new Date(comment.date).toDateString()}/>
                    </Grid>
                    )))}
                </Grid>
            </Container>
        </>
    )
}