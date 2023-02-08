import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const randomize = () => {
    if(isLoading) return;
    setIsLoading(true);
    let restaurant = document.getElementsByClassName("restaurant");
    const random = Math.floor(Math.random() * restaurant.length);
    console.log(random);

    for (let i = 0; i < restaurant.length; i++) {
      restaurant[i].classList.add("opacity-10");
    }

    for (let k = 0; k < 13; k++) {
      if (k === 12) {
        setTimeout(() => {
          for (let i = 0; i < restaurant.length; i++) {
            restaurant[i].classList.add("opacity-10");
          }
          let randomRestaurant = restaurant[random];
          randomRestaurant.classList.remove("opacity-10");
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
        <div className="flex flex-col justify-center flex-grow h-screen">
          <div className="restaurant text-center opacity-10 transition-opacity">
            Sg Pelek
          </div>
          <div className="restaurant text-center opacity-10 transition-opacity">
            Mat Ayam Kampung
          </div>
          <div className="restaurant text-center opacity-10 transition-opacity">
            Banana Leaf
          </div>
          <div className="restaurant text-center opacity-10 transition-opacity">
            3BG
          </div>
        </div>
      </div>
    </>
  );
}
