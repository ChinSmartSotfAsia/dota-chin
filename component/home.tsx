import React, { useState } from 'react'
import Link from "next/link";
import { Heroes } from "@/lib/type";
import tw from 'twin.macro';
import "@emotion/css"


const Select = tw.select`px-5 py-4 m-2 text-sm text-white bg-gray-900 rounded-md`

type homeProps = {
    heroes: Heroes[];
}
export const Home = ({ heroes }: homeProps) => {
    const [filter, setFilter] = useState('');// ใช้เพื่อเก็บค่าที่เราเลือกใน select แล้วส่งไปให้ Page
    const [sort, setSort] = useState('id');
    const [search, setSearch] = useState('');
    /* console.log(heroes); */

    console.log(filter);
    console.log(sort);
    console.log(search);

    function saveItem(heroes: Heroes) {
        const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
        const index = favoriteObj.findIndex((item: Heroes) => item.id === heroes.id);
        if (index === -1) {
            favoriteObj.push(heroes);
        } else {
            favoriteObj.splice(index, 1);
        }
        localStorage.setItem('favorite', JSON.stringify(favoriteObj));
    }

    const searchHeroes = heroes.filter((item) => item.localized_name.toLowerCase().includes(search.toLowerCase()));//ทำการค้นหาข้อมูลที่เราต้องการ

    const sortedHeroes = searchHeroes.sort((a, b) => {
        if (sort === "acs") {
            return a.id > b.id ? 1 : -1;
        } else if (sort === "desc") {
            return a.id < b.id ? 1 : -1;
        } else {
            return 0;
        }
    }) // ทำการเรียงข้อมูลที่เราต้องการ

    const filterHeroes = sortedHeroes.filter((item) => item.attack_type === filter || item.primary_attr === filter || filter === "");// ทำการกรองข้อมูลที่เราต้องการ

    
    return (
        <>
            <div className="flex justify-center text-gray-600 focus-within:text-gray-400 ">
                <input type="text" className="px-10 py-4 m-3 text-sm text-white bg-gray-900 rounded-md " placeholder="Search..." value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }} />

                <Select data-te-select-init onChange={(e) => {
                    setFilter(e.target.value);
                }}>
                    <option value="">All</option>
                    <option value="agi">Agility</option>
                    <option value="int">Intelligence</option>
                    <option value="str">Strength</option>
                    <option value="Melee">Melee</option>
                    <option value="Ranged">Ranged</option>
                </Select>
                <Select data-te-select-init onChange={(e) => {
                    setSort(e.target.value);
                }}>
                    <option value="id">All</option>
                    <option value="acs">Ascending</option>
                    <option value="desc">Descending</option>
                </Select>
            </div>

            <div className="container flex items-center justify-center min-h-screen mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filterHeroes.map((item: Heroes) => (
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
                                <button className="inline-block px-4 py-2 mt-1 text-base font-medium text-white bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={() => saveItem(item)}>Favorite</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}