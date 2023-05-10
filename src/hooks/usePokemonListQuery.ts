import { useInfiniteQuery } from "@tanstack/react-query"
import { getPokemonList } from "../api";

const usePokemonListQuery = () => {
    return useInfiniteQuery({
        queryKey: ["pokemonList"],
        queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam),
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage;
        },
      })
}

export default usePokemonListQuery;