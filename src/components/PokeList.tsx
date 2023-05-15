import PokeCard from "./PokeCard";
import InfiniteScroll from "react-infinite-scroll-component";
import usePokemonListQuery from "../hooks/usePokemonListQuery";

const PokeList = () => {
  const { isLoading, isError, fetchNextPage, hasNextPage, data } =
    usePokemonListQuery();

  const dataLength = data?.pages.reduce((pokemon, page) => {
    return pokemon + page.pokemon.length;
  }, 0);

  const dummyArray = new Array(20).fill(1);

  if (isLoading || isError) {
    return (
      <div data-testid="infinite-list-container">
        <div className="flex flex-wrap gap-4">
          {dummyArray.map((i, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col gap-2 flex-pokecard-21 rounded-lg cursor-pointer border border-solid border-gray-500 p-2"
            >
              <div className="bg-slate-200 rounded-xl h-[300px]"></div>
              <div className="bg-slate-200 m-auto rounded-xl w-1/2 h-6"></div>
              <div className="bg-slate-200 rounded-xl w-1/2 h-6"></div>
              <div className="bg-slate-200 rounded-xl w-1/2 h-6"></div>
              <div className="bg-slate-200 rounded-xl w-1/2 h-6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
