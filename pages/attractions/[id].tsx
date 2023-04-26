import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Heroes } from "@/lib/type";
import Image from "next/image";
import tw from "twin.macro";

const Detail = tw.ul`flex flex-col items-start justify-start gap-2 my-5 text-gray-900`;

async function getData(id: any) {
  const res = await fetch("https://api.opendota.com/api/heroStats");
  const data = await res.json();
  const item = data.find((item: any) => item.id == id);
  return item;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const data = await getData(id);
  return {
    props: { heroes: data },
  };
}

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

function Attraction({ heroes, }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /* const newrole = heroes.roles.map((item: any) => {
    return [item];
  }); */
  return (
    <div>
      <section className="p-8 mx-auto md:py-0 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen " key={heroes.id}>
          <div>
            <Image className="object-cover w-full rounded-lg shadow-lg md:h-72" src={`https://api.opendota.com${heroes.img}`} alt={"heroes"} width={300} height={300} />
          </div>
          <article className="mr-56 ">
            <h1 className="mb-5 text-4xl font-bold text-gray-900 lg:text-4xl">
              Name : {heroes.localized_name}
            </h1>
            <Detail>
              <li>Attraction : {heroes.primary_attr}</li>
              <li>Type : {heroes.attack_type}</li>
              <li>Attack Range : {heroes.attack_range}</li>
              <li>Base Health : {heroes.base_health}</li>
              <li>Base Mana : {heroes.base_mana}</li>
              <li>Base Armor : {heroes.base_armor}</li>
              <li>Base Attack Min : {heroes.base_attack_min}</li>
              <li>Base Attack Max : {heroes.base_attack_max}</li>
              <li>Move Speed : {heroes.move_speed}</li>
            </Detail>
            <button
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[custom] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[custom2] focus:bg-neutral-800 focus:shadow-[custom2] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[custom2] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[custom3] dark:focus:bg-neutral-900 dark:focus:shadow-[custom3] dark:active:bg-neutral-900 dark:active:shadow-[custom3]">
              <Link href="/">Back</Link>
            </button>
            <button className="px-6 py-2 ml-20 font-medium text-white bg-green-500 rounded-md paddtext-base hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() => saveItem(heroes)}
            >
              <Link href="/favorite-page">Add Favorite</Link>
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Attraction;
