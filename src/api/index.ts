import axios from "axios";
import { MainClient, NamedAPIResource, Pokemon } from "pokenode-ts";

const pokeClient = new MainClient();

export interface PokemonListResponse {
  pokemon: NamedAPIResource[];
  nextPage: number;
}

let allPokemonByIDData: Array<Pokemon> = [];

export const getPokemonList = async (
  pageParam = 0
): Promise<PokemonListResponse> => {
  const response = await pokeClient.pokemon.listPokemons(pageParam * 20, 20);
  const { results } = response;
  return {
    pokemon: results,
    nextPage: pageParam + 1,
  };
};

export const getPokemonInfoByName = async (name: string): Promise<Pokemon> => {
  return pokeClient.pokemon
    .getPokemonByName(name)
    .then((data) => {
      allPokemonByIDData = [...allPokemonByIDData, data];
      return data;
    })
    .catch((error) => error);
};

export const filterPokemonByID = (id: number) => {
  const pokemonByID = allPokemonByIDData.find((p) => p.id === id)
  return pokemonByID
}
