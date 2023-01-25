import {Inter} from '@next/font/google'
import MainAppBar from "../components/app-bar/Main";
import MainLandingComponent from "../components/landing/Main";
import supabase from '../utils/supabase';
import { useEffect, useState } from 'react';

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

    const [ids, setIds] = useState<any>(null);


    useEffect(() => {
        // TODO need to run this in a cloud function
        fetch('/api/hello').then((res) => res.json()).then((data) => {
            setIds(data);
        })

    }, [])

    return (
        <>
            <MainAppBar/>
            {/* <pre>{JSON.stringify(ids, null, 2)}</pre> */}
            <MainLandingComponent/>
        </>
    )
}
