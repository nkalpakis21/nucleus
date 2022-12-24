import {Box, Container, Grid, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import RecordImage from "../../public/landing/record-player.jpg"
import DjImage from "../../public/landing/dj.jpg"
import HeroImage from "../../public/landing/artist-stage.jpg"
import Space from "../ui/typography/Space";
import ImageComponent from "../ui/image/Image";
import * as React from "react";
import FooterComponent from "../footer/Footer";

export default function MainLandingComponent() {
    const theme = useTheme();
    return (
        <>
            <Container maxWidth="md" sx={{py: 10}}>
                <Grid container sx={{alignItems: "baseline", justifyContent: "center", my: 2}}>
                    < Typography variant="h4" textAlign="center">Welcome to</Typography>
                    <Space/>
                    <Typography component="span" variant="h4" sx={{color: theme.palette.secondary.main}}
                                textAlign="center">NUCLEUS</Typography>
                    <Space/>
                    <Typography component="span" variant="h4" textAlign="center">🧬 🎧 🖤</Typography>
                </Grid>
                <Grid container justifyContent="center">
                    <ImageComponent
                        sx={{py: 2, height: [300, 300, 400, 400], width: [400, 400, 700, 700]}}
                        src={HeroImage}
                        alt="Picture of the author"
                        borderRadius="md"
                    />
                </Grid>
                <Grid container rowSpacing={6} sx={{my: 4}}>
                    <Grid item xs={12} md={6} sx={{pr: 8}}>
                        <Typography variant="h4" textAlign="start">Let your fans & followers ride along your journey as
                            an
                            artist</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageComponent
                            sx={{py: 2, height: [200, 200, 300, 300], width: ['100%', '100%', 400, 400]}}
                            src={DjImage}
                            alt="Picture of the author"
                            borderRadius="md"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{pr: 8}}>
                        <Typography variant="h4" textAlign="start">Create your own NFTs to incentivize people who
                            support
                            you the
                            most</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageComponent
                            sx={{py: 2, height: [200, 200, 300, 300], width: ['100%', '100%', 400, 400]}}
                            src={RecordImage}
                            alt="Picture of the author"
                            borderRadius="md"
                        />
                    </Grid>
                </Grid>
            </Container>
            <FooterComponent/>
        </>
    )
}