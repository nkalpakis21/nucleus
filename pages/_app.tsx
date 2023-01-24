import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {responsiveFontSizes} from "@mui/material";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

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

    // This is the chainId your dApp will work on.
    const activeChainId = ChainId.Goerli;

    return (
        <ThemeProvider theme={responsiveTheme}>
            <ThirdwebProvider desiredChainId={activeChainId}>
            <Component {...pageProps} />
            </ThirdwebProvider>

        </ThemeProvider>
    )
}
