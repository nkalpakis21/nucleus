import supabase from "../../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../components/app-bar/Main";
import { Box, Container, Grid, Typography } from "@mui/material";

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

    const result: any = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${post.conversation_id}&tweet.fields=in_reply_to_user_id,author_id`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));

    return {
        props: {
            post,
            comments: result || {}

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
            {/* <pre>{JSON.stringify(comments, null, 2)}</pre> */}
            <Container maxWidth="md">
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <YouTube videoId={post.youtube_id} opts={opts} onReady={onReady} />
            </Container>
        </>
    )
}