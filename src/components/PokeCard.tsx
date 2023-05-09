import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { getPokemonInfoByName } from "../api";
import { Pokemon } from "pokenode-ts";

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard = ({ name, url }: PokeCardProps) => {
  const {
    isLoading,
    isSuccess,
    data: allPokemonInfo,
  } = useQuery({
    queryKey: ["pokemonInfoByName", name],
    queryFn: () => getPokemonInfoByName(name),
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div
      key={name}
      className="flex flex-col flex-pokecard-21 rounded-lg cursor-pointer border border-solid border-gray-500 p-2"
    >
      <img
        src={allPokemonInfo?.sprites.front_shiny as string}
        alt="Pokemon image"
      />
      <p>{allPokemonInfo?.base_experience}</p>
      <p>{name}</p>
    </div>
  );
};

export default PokeCard;
