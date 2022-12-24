import HeroImage from "../../../public/landing/artist-stage.jpg";
import {Box} from "@mui/material";
import Image from 'next/image'
import Link from "next/link";

const getBorderRadius = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        case "sm":
            return 3;
        case "md":
            return 5;
        case "lg":
            return 7;
    }
}

interface Props {
    sx?: {}
    src: any,
    alt: string,
    borderRadius?: 'sm' | 'md' | 'lg'
    href?: string,
}

export default function ImageComponent({sx, src, alt, borderRadius, href}: Props) {

    const image = <Image
        fill
        src={src}
        alt={alt}
        style={{borderRadius: getBorderRadius(borderRadius!)}}
    />

    if (href) {
        return (
            <Box sx={{...sx, position: 'relative'}}>
                <Link href={href}>
                    {image}
                </Link>
            </Box>
        )
    }
    return (
        <Box sx={{...sx, position: 'relative'}}>
            {image}
        </Box>
    )
}

ImageComponent.defaultProps = {
    borderRadius: 'sm',
    sx: {},
    href: null,
}