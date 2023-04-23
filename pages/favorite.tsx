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
    </div>
  )
}

export default favorite

