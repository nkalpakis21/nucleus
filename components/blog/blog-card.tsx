import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import Link from 'next/link';
import ImageComponent from "../ui/image/Image";
import TwitterIcon from "../../public/social/twitter.png"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import '../../public/styles/style-utils.module.css';


export default function BlogCard({title, description, id, date}: {title: string, description: string, id: string, date: string}) {

    return (
        
        <Link href={`/blog/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Grid container justifyContent="space-between" direction="column" sx={{p:3, backgroundColor: grey[200], width: [330,340,360,360], height: 200, borderRadius: 1}}>
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
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography sx={{color: grey[600]}} variant="body1">{date}</Typography>            
                    </Grid>
                    <Grid item sx={{display: 'flex'}}>
                        <Typography sx={{backgroundImage: 'linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,182,69,1) 52%, rgba(253,29,29,1) 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }} className="blinker" variant="body1">1.5K</Typography>
                        <VisibilityOutlinedIcon />
                    </Grid>
                </Grid>
            </Grid>
        </Link>
    )
}
