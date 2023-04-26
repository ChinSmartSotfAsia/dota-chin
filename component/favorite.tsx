import { Heroes } from "@/lib/type";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import tw from "twin.macro";
import "@emotion/css";

const Detail = tw.ul`text-lg text-gray-900`;

const Tital = tw.h1`text-2xl font-bold text-gray-900`;

const Button = tw.button`inline-block px-4 py-2 mt-1 text-base font-medium text-white bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 `;

const Card = tw.div`shadow-lg rounded-xl`;

const CardBody = tw.div`flex flex-col p-5`;

const CardImage = tw.div`overflow-hidden rounded-xl`;


type favoritepageProps = {
    heroes: Heroes[];
}

export const Favorite = ({ heroes }: favoritepageProps) => {
    const [favorite, setFavorite] = useState<Heroes[]>([]);

    useEffect(() => {
        const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
        setFavorite(favoriteObj);
    }, []);

    function removeItem(heroes: Heroes) {
        const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
        const index = favoriteObj.findIndex((item: Heroes) => item.id === heroes.id);
        if (index !== -1) {
            favoriteObj.splice(index, 1)
            localStorage.setItem('favorite', JSON.stringify(favoriteObj));
            setFavorite(favoriteObj)
        }
    }

    return (
        <div>
            <div className="container flex items-center justify-center min-h-screen mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {favorite.map((item: Heroes) => (
                        <Card>
                            <CardBody>
                                <CardImage key={item.id}>
                                    <Image className="w-full" src={`https://api.opendota.com${item.img}`} alt={"item"} width={300} height={300} />
                                </CardImage>
                                <div>
                                    <Tital >Hero : {item.localized_name}</Tital>
                                    <Detail>
                                        <li>Attraction : {item.primary_attr}</li>
                                        <li>Type : {item.attack_type}</li>
                                    </Detail>
                                    <Link className="text-lg text-sky-700 hover:text-sky-500" href={"/attractions/" + item.id}> Read More</Link>
                                </div>
                                <Button
                                    onClick={() => removeItem(item)}>
                                    Remove
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

