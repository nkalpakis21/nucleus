import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '../../utils/supabase';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';

export default function MainAppBar() {
    const user = useUser();
    const router = useRouter();

   
    const handleLogout = async() => {
        const { error } = await supabase.auth.signOut();
        router.push('/');
    }
      
    return (
        <Box sx={{ flexGrow: 1, mb: 14 }}>
            <AppBar elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: 'white' }}>
                            Nucleus 🧬
                        </Typography>
                        <Link href="/stream" style={{textDecoration: 'none'}}>
                            <Button sx={{color: 'white'}} variant="text">Stream</Button>
                        </Link>
                        {!!user ? (
                            <Button sx={{color: 'white'}} onClick={handleLogout} variant="text">Sign Out</Button>
                        ) : (
                            <Link href="/login" style={{textDecoration: 'none'}}>
                                <Button sx={{color: 'white'}} variant="text">Sign In</Button>
                            </Link>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}