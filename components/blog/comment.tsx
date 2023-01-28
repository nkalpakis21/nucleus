import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function CommentComponent({text, author, date}: {text: string, author?: string, date: string}) {

    return (
        <>
            {author && (<Typography variant="body1">{author}</Typography>)}
            <Box sx={{width: 500, backgroundColor: 'rgba(172, 225, 246, 0.16)', borderRadius: 1, p: 2}}>
                <Typography variant="body2">{text}</Typography>
                <Typography sx={{mt: 2}} variant="body2">{date}</Typography>
            </Box>
        </>
    )
}