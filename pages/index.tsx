import Head from "next/head";
import Image from "next/image";
import { PacmanLoader, PuffLoader, PropagateLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [randomRestaurant, setRandomRestaurant] = useState("Ready?");
  const [randomRestaurantImage, setRandomRestaurantImage] = useState("");
  const [randomRestaurantDescription, setRandomRestaurantDescription] =
    useState("");
  let dataFetchedRef = false;

  interface RestaurantData {
    id: number;
    name: string;
    image: string;
    description: string;
  }

  const randomize = () => {
    if (isLoading) return;
    setIsLoading(true);
    setRandomRestaurantImage("");
    const random = Math.floor(Math.random() * restaurants.length);
    // if random if the same as the previous one, re-randomize
    if (restaurants[random].name === randomRestaurant) {
      randomize();
      return;
    }
    setTimeout(() => {
      setRandomRestaurant(restaurants[random].name);
      setRandomRestaurantImage(restaurants[random].image);
      setRandomRestaurantDescription(restaurants[random].description);
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    const restaurants: RestaurantData[] = require("../data/restaurant.json");
    setRestaurants(restaurants);
  }, []);

  useEffect(() => {
    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        // add to head
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = restaurant.image;
        link.as = "image";
        document.head.appendChild(link);
      });
    }
  }, [restaurants]);

  const setStyles = (imageUrl: string) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      opacity: 0.3,
    };
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
        className="bg-cover bg-center bg-no-repeat opacity-100 transition-opacity"
        style={setStyles(randomRestaurantImage)}
      >
        <div className="container mx-auto p-2 z-20 " onClick={randomize}>
          <div className="flex flex-col h-screen items-center justify-center">
            <div className="inline-flex text-center transition-opacity">
              {isLoading ? (
                <PropagateLoader
                  color="#fff"
                  cssOverride={{ display: "inline-flex", opacity: 0.5 }}
                  speedMultiplier={2}
                />
              ) : (
                <div>
                  <span className="drop-shadow-lg block">
                    {randomRestaurant}
                  </span>
                  <span className="text-sm opacity-60">
                    {randomRestaurantDescription || "Tap"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <footer className="fixed bottom-0 w-full text-center p-4">
            <span className="text-xs opacity-70 font-thin">
              MakanMana by @h4ck4life
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
