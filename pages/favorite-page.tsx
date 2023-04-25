import { Heroes } from '@/lib/type';
import { NextPage } from "next";
import { Favorite } from '@/component/favorite';

const getData = async () => {
  const res = await fetch("https://api.opendota.com/api/heroStats");
  const data: Heroes[] = await res.json();
  return data;// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

}// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

type favoritepageProps = {
  heroes: Heroes[];
}

const FavoritePage: NextPage<favoritepageProps> = (props) => <Favorite heroes={props.heroes} />

export const getServerSideProps = async () => {
  const data = await getData();
  return {
    props: { heroes: data }, // จะส่ง props ชื่อ heroes ไปให้ Page
  }
}// ใช้เพื่อเรียกข้อมูลจาก API แล้วส่งไปให้ Page

export default FavoritePage;