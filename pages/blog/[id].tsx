import supabase from "../../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../components/app-bar/Main";
import { Box, Container, Grid, Typography } from "@mui/material";

export async function getServerSideProps ({params}: any) {
    const {data: post, error} = await supabase.from('posts').select('*, comments(*)').eq('id', params.id).single();
    return {
        props: {
            post
        }
    }
}
export default function BlogPostPage({post}: any) {
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
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <YouTube videoId={post.youtube_id} opts={opts} onReady={onReady} />
            </Container>
        </>
    )
}