import React, { useEffect } from 'react'
import { GetServerSidePropsContext,InferGetServerSidePropsType } from 'next';
import { Heroes } from '@/lib/type';
import Link from 'next/link';
import { useState } from 'react';


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
  

function favorite({heroes}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [favorite, setFavorite] = useState<Heroes[]>([]);  // ใช้เพื่อเก็บค่าที่เราเลือกใน select แล้วส่งไปให้ Page

  useEffect(() => {
    const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
    setFavorite(favoriteObj);
  }, []);// ใช้เพื่อเก็บค่าที่เราเลือกใน select แล้วส่งไปให้ Page

  function removeItem(heroes: Heroes){
    const favoriteObj = JSON.parse(localStorage.getItem('favorite') || '[]');
    const index = favoriteObj.findIndex((item: Heroes) => item.id === heroes.id);
    if (index !== -1) {
      favoriteObj.splice(index,1)
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

export default favorite

{/* <div>
      <div className="grid-container">
        {favorite.map((item: Heroes) => (
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
              <button className="remove-button" onClick={()=>removeItem(item)}> Remove Favorite </button>
            </div>
          </div>
        ))}
      </div>
    </div> */}