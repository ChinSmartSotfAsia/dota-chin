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
      <div className="card-attraction" key={heroes.id}>
        <img
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
