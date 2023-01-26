import supabase from '../../utils/supabase';
import MainAppBar from '../../components/app-bar/Main';
import BlogCard from '../../components/blog/blog-card';
import { Grid, Container, Typography } from '@mui/material';
import FooterComponent from '../../components/footer/Footer';

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
    return (
        <>
            <MainAppBar/>
            <Container maxWidth="lg" sx={{mb: 6, minHeight: 'calc(100vh - 200px)'}}>
                <Typography variant="h2">Threads 🧵</Typography>
                <Grid container
                    sx={{mt:5}}
                    spacing={3}
                    >
                            {posts.map((post: any) => (
                                <Grid item key={post.id}>
                                    <BlogCard title={post.title} description={post.description} id={post.id} date={new Date(post.created_at).toDateString()}/>
                                </Grid>
                            ))}
                </Grid>
            </Container>
            <FooterComponent/>
        </>
    )
}