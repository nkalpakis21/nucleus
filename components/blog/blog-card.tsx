import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import Link from 'next/link';
import ImageComponent from "../ui/image/Image";
import TwitterIcon from "../../public/social/twitter.png"

export default function BlogCard({title, description, id, date}: {title: string, description: string, id: string, date: string}) {
    return (
        
        <Link href={`/blog/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Grid container justifyContent="space-between" direction="column" sx={{p:3, backgroundColor: grey[300], width: 300, height: 200, borderRadius: 1}}>
                <Grid container justifyContent="space-between">
                    <Grid item xs={10}>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="body2">{description.length > 70 ? `${description.slice(0,70)}...` : description}</Typography>  
                    </Grid>
                    <Grid item xs>
                        <Grid container justifyContent="end">
                            <ImageComponent src={TwitterIcon} alt={"Twitter"}
                                sx={{height: 28, width: 28}}/>      
                        </Grid>
                    </Grid>
                </Grid>
                <Typography sx={{color: grey[600]}}variant="body1">{date}</Typography>        
            </Grid>
        </Link>
    )
}