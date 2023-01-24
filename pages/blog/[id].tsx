import supabase from "../utils/supabase";
import YouTube from 'react-youtube';
import MainAppBar from "../../components/app-bar/Main";
import { Container } from "@mui/material";

export async function getServerSideProps ({params}: any) {
    const {data: post, error} = await supabase.from('posts').select('*').eq('id', params.id).single();
    return {
        props: {
            post
        }
    }
}
export default function BlogPostPage({post}: any) {
    const opts = {
        height: "390",
        width: "640",
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
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <YouTube videoId={post.youtube_id} opts={opts} onReady={onReady} />
            </Container>
        </>
    )
}