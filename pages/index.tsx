import {Inter} from '@next/font/google'
import { useEffect, useState } from 'react';
import MainAppBar from "../components/app-bar/Main";
import MainLandingComponent from "../components/landing/Main";
import supabase from '../utils/supabase';
const inter = Inter({subsets: ['latin']})

interface IPlace {
    name: string,
    add1: string,
    phone: number
}


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
        fetch('/api/hello').then((res) => res.json()).then((data) => {
            setIds(data);
        })

    }, [])

    console.log(ids);
    return (
        <>
            <MainAppBar/>
            <MainLandingComponent/>
        </>
    )
}
