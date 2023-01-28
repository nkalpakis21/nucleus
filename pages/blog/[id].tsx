import supabase from "../../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../components/app-bar/Main";
import { Box, Container, Grid, Typography } from "@mui/material";
import CommentComponent from "../../components/blog/comment";
import { grey } from "@mui/material/colors";

export async function getServerSideProps ({params}: any) {
    const {data: post, error} = await supabase.from('posts').select('*, comments(*)').eq('id', params.id).single();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAHCwlQEAAAAAF4FrclyKI9Ivo3uKRlDKSaoxkAw%3D589SW9xQYVddpkxYiajIcWQDNsDHtRM9sbpndVVCUYDr5bUS2R");
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


    console.log(result);
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
                <Grid container rowSpacing={3} sx={{mt: 3}}>
                    {comments && (comments?.map((comment: any) => (
                    <Grid item>
                        <CommentComponent text={comment.text} author={comment.username} date={new Date(comment.date).toDateString()}/>
                    </Grid>
                    )))}
                </Grid>
            </Container>
        </>
    )
}