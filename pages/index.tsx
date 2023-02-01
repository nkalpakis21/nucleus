import {Inter} from '@next/font/google'
import MainAppBar from "../components/app-bar/Main";
import MainLandingComponent from "../components/landing/Main";
import supabase from '../utils/supabase';

export async function getStaticProps() {

const { data: posts, error } = await supabase
    .from('posts')
    .select('*')

return {
    props: {
        posts
    }
}

}
export default function Home({posts} : any) {

    return (
        <>
            <MainAppBar/>
            <MainLandingComponent/>
        </>
    )
}
