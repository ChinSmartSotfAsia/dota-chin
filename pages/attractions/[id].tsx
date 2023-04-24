import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "@/component/Layout";

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
function Attraction({
  heroes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const newrole = heroes.roles.map((item: any) => {
    return item;
  });
  return (
    <div>
      <div className="flex-row px-5 py-4 m-2 text-sm text-white bg-gray-900 rounded-md">
        <button >
          <a href="/">Back</a>
        </button>
      </div>
      <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row" key={heroes.id}>
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={`https://api.opendota.com${heroes.img}`}
          alt={heroes.localized_name}
          style={{ width: "300" }}
        />
        <div className="container-attraction">
          <h4>
            <b>Name : {heroes.localized_name}</b>
          </h4>
          {<p>Attraction : {heroes.primary_attr}</p>}
          {<p>Type : {heroes.attack_type}</p>}
          {<p>Roles : {newrole}</p>}
          {<p>Health : {heroes.base_health}</p>}
          {<p>Attack Range : {heroes.attack_range}</p>}
        </div>
      </div>
    </div>
  );
}

export default Attraction;
