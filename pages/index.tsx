import MainAppBar from "../components/app-bar/Main";
import MainLandingComponent from "../components/landing/Main";

export default function Home({posts} : any) {

    return (
        <>
            <MainAppBar/>
            <MainLandingComponent/>
        </>
    )
}
