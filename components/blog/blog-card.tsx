import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import Link from 'next/link';
export default function BlogCard({title, description, id}: {title: string, description: string, id: string}) {
    return (
        <Grid container sx={{p:3, backgroundColor: grey[300], width: 200, height: 200, borderRadius: 1, alignItems: 'center'}}>
            <Link href={`/blog/${id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{description}</Typography>        
            </Link>
        </Grid>
    )
}