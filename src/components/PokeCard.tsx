import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { getPokemonInfoByName } from "../api";

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard = ({ name, url }: PokeCardProps) => {
  const {
    data: allPokemonInfo,
  } = useQuery({
    queryKey: ["pokemonInfoByName", name],
    queryFn: () => getPokemonInfoByName(name),
  });

  return (
    <div
      key={name}
      className="pokeCard flex flex-col flex-pokecard-21 rounded-lg cursor-pointer border border-solid border-gray-500 p-2"
    >
      <img
        src={allPokemonInfo?.sprites.front_shiny as string}
        alt="Pokemon image"
      />
      <p className="text-center text-base font-bold mb-2">{name}</p>
      <p>Height: {allPokemonInfo?.height}</p>
      <p>Weight: {allPokemonInfo?.weight}</p>
      <p>Base Experience: {allPokemonInfo?.base_experience}</p>
      <button id="viewMoreBtn" className="bg-red-600 text-yellow-200 w-1/2 p-1 mt-2 m-auto rounded-xl hidden">View more</button>
    </div>
  );
};

export default PokeCard;
