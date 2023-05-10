import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemonInfoByName, getPokemonList } from "../api";
import PokeCard from "./PokeCard";
import InfiniteScroll from "react-infinite-scroll-component";
import usePokemonListQuery from "../hooks/usePokemonListQuery";

const PokeList = () => {
  const { isLoading, isError, fetchNextPage, hasNextPage, data } =
    usePokemonListQuery();

  console.log("data", data);

  const dataLength = data?.pages.reduce((pokemon, page) => {
    return pokemon + page.pokemon.length;
  }, 0);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  return (
    <div className="flex" data-testid="infinite-list-container">
      <InfiniteScroll
        dataLength={dataLength as number}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ? true : false}
        loader={<h4>Loading...</h4>}
      >
        <div className="flex flex-wrap gap-4">
          {data.pages.map((page) =>
            page.pokemon.map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokeList;
