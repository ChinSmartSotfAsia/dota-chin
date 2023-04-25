import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";


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
      <div className="flex-row m-6 text-sm">
        <button
          type="button"
          className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
          <Link href="/">Back</Link>
        </button>
      </div>
      <div className="p-8 md:py-0 max-w-7xl mx-auto">
        <div className="">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:place-items-center h-auto " key={heroes.id}>
            <img
              src={`https://api.opendota.com${heroes.img}`}
              alt={heroes.localized_name}
              className="w-4/5  object-cover rounded-lg shadow-lg"
            />
            <div className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-600">
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
      </div>
    </div>
  );
}

export default Attraction;


/* className="container flex items-center justify-center min-h-screen mx-auto" */