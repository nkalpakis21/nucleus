import {Grid} from "@mui/material";
import {grey} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import ImageComponent from "../ui/image/Image";
import TwitterIcon from "../../public/social/twitter.png"
import InstagramIcon from "../../public/social/instagram.png"

export default function FooterComponent() {
    return (
        <Grid container sx={{backgroundColor: grey[200], py:3, px: 4, mt: 'auto'}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Nucleus 🧬
            </Typography>
            <ImageComponent href="https://www.instagram.com/nucleus_xyz/" src={InstagramIcon} alt={"Instagram"}
                            sx={{height: 36, width: 36, mr: 2}}/>
            <ImageComponent href="https://www.twitter.com/nucleus_xyz_" src={TwitterIcon} alt={"Twitter"}
                            sx={{height: 36, width: 36}}/>
        </Grid>
    )
}