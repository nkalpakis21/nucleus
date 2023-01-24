import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { color } from '@mui/system';
import Link from 'next/link'

export default function MainAppBar() {

    return (
        <Box sx={{ flexGrow: 1, mb: 10 }}>
            <AppBar elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: 'white' }}>
                        Nucleus 🧬
                    </Typography>
                    <Link href="/blog">
                        <Button sx={{color: 'white'}} variant="text">Blog</Button>
                    </Link>
                    <Link href="/login">
                        <Button sx={{color: 'white'}} variant="text">Sign In</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}