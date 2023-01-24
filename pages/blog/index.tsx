import supabase from '../utils/supabase';
import MainAppBar from '../../components/app-bar/Main';
import BlogCard from '../../components/blog/blog-card';
import { Grid, Container, Typography } from '@mui/material';

export async function getStaticProps() {

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
    
    return {
        props: {
            posts
        }
    }
}

export default function BlogListPage({posts}: any) {

    console.log(posts);
    return (
        <>
            <MainAppBar/>
            <Container maxWidth="md">
                <Typography variant="h2" align='center'>Blog Posts</Typography>
                <Grid container
                    justifyContent="center"
                    sx={{mt:5}}
                    spacing={3}
                    >
                        {posts.map((post: any) => (
                            <Grid item>
                                <BlogCard title={post.title} description={post.description} id={post.id}/>
                            </Grid>
                        ))}
                </Grid>
            </Container>
            
        </>
    )
}