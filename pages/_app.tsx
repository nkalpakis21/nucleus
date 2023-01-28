import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {responsiveFontSizes} from "@mui/material";
import { SessionContextProvider, useSupabaseClient } from '@supabase/auth-helpers-react';
import supabase from '../utils/supabase';



export default function App({Component, pageProps}: AppProps) {
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Rubik',
            ].join(','),
        },
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#341186',
            },
        },
    });

    const responsiveTheme = responsiveFontSizes(theme)


    return (
        <ThemeProvider theme={responsiveTheme}>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <Component {...pageProps} />
            </SessionContextProvider>
        </ThemeProvider>
    )
}
