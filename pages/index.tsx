import {Inter} from '@next/font/google'
import MainAppBar from "../components/app-bar/Main";
import MainLandingComponent from "../components/landing/Main";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <MainAppBar/>
            <MainLandingComponent/>
        </>
    )
}
