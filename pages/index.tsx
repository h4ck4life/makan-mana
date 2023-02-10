import Head from "next/head";
import Image from "next/image";
import { PacmanLoader, PuffLoader, PropagateLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [randomRestaurant, setRandomRestaurant] = useState("Ready?");
  let dataFetchedRef = false;

  interface RestaurantData {
    id: number;
    name: string;
  }

  const randomize = () => {
    if (isLoading) return;
    setIsLoading(true);
    const random = Math.floor(Math.random() * restaurants.length);
    setTimeout(() => {
      setRandomRestaurant(restaurants[random].name);
      setIsLoading(false);
    }
    , 1200);
  };

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    const restaurants: RestaurantData[] = require("../data/restaurant.json");
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
        className="container mx-auto p-2"
        onClick={randomize}
      >
        <div className="flex flex-col h-screen items-center justify-center">
          <div className="restaurant opacity-70 transition-opacity mb-3">
            {isLoading ? (
              <PropagateLoader
                color="#fff"
                cssOverride={{ display: "inline-flex", opacity: 0.5 }}
                speedMultiplier={2}
              />
            ) : (
              randomRestaurant
            )}
          </div>
        </div>
      </div>
    </>
  );
}
