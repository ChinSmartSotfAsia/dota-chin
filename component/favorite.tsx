import { Heroes } from "@/lib/type";
import { useState, useEffect } from 'react';
import Link from "next/link";


type favoritepageProps = {
    heroes: Heroes[];
}

export const Favorite = ({ heroes }: favoritepageProps) => {
    const [favorite, setFavorite] = useState<Heroes[]>([]);  // ใช้เพื่อเก็บค่าที่เราเลือกใน select แล้วส่งไปให้ Page

    useEffect(() => {
        const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
        setFavorite(favoriteObj);
    }, []);// ใช้เพื่อเก็บค่าที่เราเลือกใน select แล้วส่งไปให้ Page

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
                        <div className="shadow-lg rounded-xl">
                            <div className="flex flex-col p-5">
                                <div className="overflow-hidden rounded-xl" key={item.id}>
                                    <img className="w-full" src={`https://api.opendota.com${item.img}`} />
                                </div>
                                <div className="">
                                    <h1 className="text-2xl font-bold text-gray-900">Hero : {item.localized_name}</h1>
                                    <p className="text-lg text-gray-700" >Attraction : {item.primary_attr}</p>
                                    <p className="text-lg text-gray-700">Type : {item.attack_type}</p>
                                    <Link className="text-lg text-sky-700 hover:text-sky-500" href={"/attractions/" + item.id}> Read More</Link>
                                </div>
                                <button className="inline-block px-4 py-2 mt-1 text-base font-medium text-white bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={() => removeItem(item)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

