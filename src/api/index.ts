import axios from "axios";
import { MainClient, NamedAPIResource, Pokemon } from "pokenode-ts";

const pokeClient = new MainClient();

interface PokemonListResponse {
  pokemon: NamedAPIResource[],
  nextPage: number
}

export const getPokemonList = async (pageParam = 0): Promise<PokemonListResponse> => {
  const response = await pokeClient.pokemon.listPokemons(pageParam * 20, 20);
  const { results } = response;
  return {
    pokemon: results,
    nextPage: pageParam + 1
  }
};

export const getPokemonInfoByName = async (name: string): Promise<Pokemon> => {
  return pokeClient.pokemon
    .getPokemonByName(name)
    .then((data) => data)
    .catch((error) => error);
};
