import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemonInfoByName, getPokemonList } from "../api";
import PokeCard from "./PokeCard";
import InfiniteScroll from "react-infinite-scroll-component";

const PokeList = () => {

  const { isLoading, isError, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ["pokemonList"],
      queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

  const dataLength = data?.pages.reduce((pokemon, page) => {
    return pokemon + page.pokemon.length;
  }, 0);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InfiniteScroll
        dataLength={dataLength as number}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ? true : false}
        loader={<h4>Loading...</h4>}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
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
