import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';

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

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
