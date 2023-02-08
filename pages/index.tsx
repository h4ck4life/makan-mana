import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  let dataFetchedRef = false;

  const randomize = () => {
    if (isLoading) return;
    setIsLoading(true);
    let restaurant = document.getElementsByClassName("restaurant");
    const random = Math.floor(Math.random() * restaurant.length);

    for (let i = 0; i < restaurant.length; i++) {
      restaurant[i].classList.add("opacity-10");
    }

    for (let k = 0; k < 13; k++) {
      if (k === 12) {
        setTimeout(() => {
          for (let i = 0; i < restaurant.length; i++) {
            restaurant[i].classList.add("opacity-10");
          }
          restaurant[random].classList.remove("opacity-10");
          setIsLoading(false);
        }, 3600);
      } else {
        setTimeout(() => {
          for (let i = 0; i < restaurant.length; i++) {
            setTimeout(() => {
              restaurant[i].classList.toggle("opacity-10");
            }, i * 20);
          }
        }, k * 300);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    const restaurants = require("../data/restaurant.json");
    setRestaurants(restaurants);
  }, []);

  return (
    <>
      <Head>
        <title>Makan Mana?</title>
        <meta name="description" content="Makan Mana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="container mx-auto p-2 inter.className"
        onClick={randomize}
      >
        <div className="flex flex-col flex-grow h-screen mt-24">
          {restaurants.map((data) => (
            <div
              className="restaurant text-center opacity-10 transition-opacity mb-3"
              key={data.id}
            >
              {data.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
