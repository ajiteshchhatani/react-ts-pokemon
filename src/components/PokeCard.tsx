import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { getPokemonInfoByName } from "../api";
import { Pokemon } from "pokenode-ts";

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard = ({ name, url }: PokeCardProps) => {
  const { isLoading, isSuccess, data: allPokemonInfo } = useQuery({
    queryKey: ["pokemonInfoByName", name],
    queryFn: () => getPokemonInfoByName(name),
  });
  
  if(isLoading) return <h1>Loading...</h1>
  
  return (
    <div
      key={name}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 0 21%",
        border: "1px solid lightgray",
        borderRadius: "10px",
        cursor: "pointer",
        padding: "8px",
      }}
    >
      <img src={allPokemonInfo?.sprites.back_default as string} alt="Pokemon image" />
      <p>{allPokemonInfo?.base_experience}</p>
      <p>{name}</p>
    </div>
  );
};

export default PokeCard;
