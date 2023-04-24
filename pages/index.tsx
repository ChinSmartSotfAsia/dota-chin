import React, { useEffect,useState } from "react";
import Link from "next/link";
import { Heroes} from "@/lib/type";
import { InferGetServerSidePropsType } from "next";
import favorite from './favorite';
import { json } from "stream/consumers";



interface attractions {
  id: number;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  img: string;
}
async function getData() {
  const res = await fetch("https://api.opendota.com/api/heroStats");
  const data: Heroes[] = await res.json();
  return data;// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

}// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

export async function getServerSideProps() {
  const data = await getData();
  return {
    props: {heroes:data}, // จะส่ง props ชื่อ heroes ไปให้ Page
  }
}// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

function Page({heroes}:InferGetServerSidePropsType<typeof getServerSideProps>) {
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
  
  const sortedHeroes =  searchHeroes.sort((a, b) => {
    if (sort === "acs") {
      return a.id > b.id? 1 : -1;
    } else if (sort === "desc") {
      return a.id < b.id ? 1 : -1;
    } else {
      return 0;
    }
  }) // ทำการเรียงข้อมูลที่เราต้องการ
  
  const filterHeroes = sortedHeroes.filter((item) => item.attack_type === filter || item.primary_attr === filter || filter === "");// ทำการกรองข้อมูลที่เราต้องการ

  const displayHero =  filterHeroes;// ทำการแสดงข้อมูลที่เราต้องการ
  
  return (
    <>
      <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <p>Filter</p>
        <select 
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="agi">Agility</option>
          <option value="int">Intelligence</option>
          <option value="str">Strength</option>
          <option value="Melee">Melee</option>
          <option value="Ranged">Ranged</option>
        </select>
        <p>Sort</p>
        <select
          onChange={(e) => {
            setSort(e.target.value );
          }}
        >
          <option value="">All</option>
          <option value="acs">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="grid-container">
        {displayHero.map((item: Heroes) => (
          <div className="card" key={item.id}>
            <img
              src={`https://api.opendota.com${item.img}`}
              alt={item.localized_name}
              style={{ width: "100%" }}
            />
            <div className="container">
              <h4>
                <b>Name : {item.localized_name}</b>
              </h4>
              {<p>Attraction : {item.primary_attr}</p>}
              {<p>Type : {item.attack_type}</p>}
              {<Link href={"/attractions/" + item.id}> Read More</Link>}
              <button className="bg-lime-500  save-button" onClick={()=>saveItem(item)}> Add Favorite </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
